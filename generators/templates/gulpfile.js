require('dotenv').config()
const config = require('./package.json').config;
const {series} = require('gulp');
const shell = require('gulp-shell');
const del = require('del');

exports.clean = function clean (cb) {
  return del([
    config.contracts_build_directory
  ], cb);
}

const migrate = shell.task(`truffle migrate --reset --network localnet`)
exports.migrate = migrate;

function watch () {
  require('gulp').watch(['contracts/**/*'], migrate);
}
exports.watch = watch;

exports.default = series(
  migrate,
  watch,
);

var cleanExit = function() { process.exit() };
process.on('SIGINT', cleanExit); // catch ctrl-c
process.on('SIGTERM', cleanExit); // catch kill
