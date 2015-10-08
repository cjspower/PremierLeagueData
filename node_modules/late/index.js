var fs = require('fs')
var Path = require('path')
var _ = require('funderscore')
var Bliss = require('bliss')

function late (baseDir, opt) {
  var bliss = new Bliss()
  var files = readTree(baseDir, opt)

  return _.map(files, function (body, path) {
    return bliss.compile(body, {filename: path})
  })
}

function readTree(baseDir, opt) {
  opt = opt || {}
  opt.filter = opt.filter || endsWith('.bliss')

  baseDir = Path.resolve(process.cwd(), baseDir)

  var files = walkReduce(baseDir, function (files, path) {
      if (opt.filter(path)) {
        files.push(path)
      }
      return files
    }, [])

  files = files.reduce(function (files, path) {
    var rel = Path.relative(baseDir, path)
    files[rel] = fs.readFileSync(path, {encoding: 'utf8'})
    return files
  }, {})

  return files
}

function endsWith(end, str) {
  if (typeof str !== 'string') {
    return function (str) {
      return endsWith(end, str)
    }
  }
  return str.substr(-end.length) === end
}

function walkReduce (startDir, reducer, acc) {
  fs.readdirSync(startDir)
  .map(function (x) { return Path.resolve(startDir, x)})
  .forEach(function (path) {
    if (fs.statSync(path).isDirectory()) {
      acc = walkReduce(path, reducer, acc)
    } else {
      acc = reducer(acc, path)
    }
  })
  return acc
}

module.exports = late