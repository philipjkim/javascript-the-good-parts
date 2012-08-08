{exec} = require 'child_process'

task 'run', ->
  nodeunit = './node_modules/.bin/nodeunit'
  exec "#{nodeunit} test", (err, stdout, stderr) ->
    console.log err if err
    console.log stdout

task 'lint', ->
  jshint = './node_modules/.bin/jshint'
  exec "#{jshint} test", (err, stdout, stderr) ->
    console.log err if err
    console.log stdout
