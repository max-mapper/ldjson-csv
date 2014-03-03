var csv = require('rfc-csv')
var through = require('through2')
var combine = require('stream-combiner')
var ldj = require('ldjson-stream')

module.exports = function() {
  var parser = csv(true)
  var transform = through.obj(convert)
  var headers

  parser.once('header', function (header) {
    headers = header
  })
  
  return combine(
    parser,
    transform,
    ldj.serialize()
  )
  
  function convert(row, _, next) {
    var obj = rowToObject(row)
    if (obj) {
      this.push(obj)
    }
    next()
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
