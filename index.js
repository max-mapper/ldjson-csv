var csv = require('rfc-csv')
var through = require('through')
var combine = require('stream-combiner')
var ldj = require('ldjson-stream')

module.exports = function() {
  var parser = csv(true)
  var transform = through(convert)
  var headers

  parser.once('header', function (header) {
    headers = header
  })
  
  return combine(
    parser,
    transform,
    ldj.serialize()
  )
  
  function convert(row) {
    var obj = rowToObject(row)
    if (!obj) return
    this.queue(obj)
  }

  function rowToObject(row) {
    var obj = {}
    var isEmpty = true
    for (var i = 0; i < row.length; ++i) {
      if (!row[i]) continue
      obj[headers[i]] = row[i]
      isEmpty = false
    }
    if (isEmpty) return
    return obj
  }
  
}
