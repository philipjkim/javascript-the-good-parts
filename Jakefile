desc('Runs all tests');
task('test', function () {
  var cmd = './node_modules/nodeunit/bin/nodeunit test';
  jake.exec(cmd, function() {
    console.log('All tests passed.');
    complete();
  }, {printStdout: true});
}, {async: true});

desc('Default task is test');
task('default', function() {
  jake.Task.test.invoke();
});
