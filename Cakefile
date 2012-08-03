{exec} = require 'child_process'

task 'run', ->
  nodeunit = './node_modules/nodeunit/bin/nodeunit'
  exec "#{nodeunit} test", (err, stdout, stderr) ->
    console.log err if err
    console.log stdout

task 'lint', ->
  nodelint = './node_modules/nodelint/nodelint'
  options = '--config config/option.js'
  exec "#{nodelint} test #{options}", (err, stdout, stderr) ->
    console.log err if err
    console.log stdout
