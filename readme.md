# ldjson-csv

#### streaming csv to [line delimited json](https://en.wikipedia.org/wiki/Line_Delimited_JSON) parser

[![NPM](https://nodei.co/npm/ldjson-csv.png)](https://nodei.co/npm/ldjson-csv/)

## usage

```
var parser = require('ldjson-csv')
```

#### parser()

returns a transform stream that accepts CSV data and emits line delimited JSON

usage:

```js
fs.createReadStream('data.csv')
  .pipe(require('ldjson-csv')())
  .on('data', function(obj) {
    // obj is a javascript object
  })
```

### license

BSD
