desc('Default task is test');
task('default', function() {
  var cmd = './node_modules/nodeunit/bin/nodeunit test';
  jake.exec(cmd, function() {
    console.log('All tests passed.');
    complete();
  }, { printStdout: true });
}, { async: true });

desc('Lint codes');
task('lint', function() {
  var cmd = './node_modules/nodelint/nodelint test --config config/option.js';
  jake.exec(cmd, function() {
    console.log('Linting finished.');
    complete();
  }, { printStdout: true });
}, { async: true });
