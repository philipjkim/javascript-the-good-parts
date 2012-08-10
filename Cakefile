{exec} = require 'child_process'

task 'run', ->
  mocha = './node_modules/.bin/mocha'
  exec "#{mocha} -R spec test", (err, stdout, stderr) ->
    console.log err if err
    console.log stdout

task 'lint', ->
  jshint = './node_modules/.bin/jshint'
  exec "#{jshint} test", (err, stdout, stderr) ->
    console.log err if err
    console.log stdout
