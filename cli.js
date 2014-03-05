#!/usr/bin/env node

var transform = require('./')

process.stdin
  .pipe(transform({ stringify: true }))
  .pipe(process.stdout)
