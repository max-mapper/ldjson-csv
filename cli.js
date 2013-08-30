#!/usr/bin/env node

var transform = require('./')

process.stdin
  .pipe(transform())
  .pipe(process.stdout)
