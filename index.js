var csv = require('rfc-csv')
var through = require('through2')
var combine = require('stream-combiner')
var ldj = require('ldjson-stream')

module.exports = function(opts) {
  var parser = csv(true)
  var transform = through.obj(convert)
  var headers
  var combineSteps = [parser, transform]

  parser.once('header', function (header) {
    headers = header
  })

  if (opts && opts.stringify) {
    combineSteps.push(ldj.serialize())
  }
  
  return combine.apply(null, combineSteps)
  
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
