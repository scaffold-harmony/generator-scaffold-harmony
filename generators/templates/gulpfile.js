require('dotenv').config()
const config = require('./package.json').config;
const {series, parallel, watch} = require('gulp');
const shell = require('gulp-shell');
const del = require('del');

exports.clean = function (cb) {
  return del([
    config.contracts_build_directory
  ], cb);
}

exports.compile = shell.task('truffle compile');

exports.migrate = shell.task(`truffle migrate --reset --network ${process.env.NETWORK}`)

exports.devnet = shell.task(`npm run harmony:devnet`);

exports.build = series(
  exports.clean,
  exports.compile,
  exports.migrate,
);

exports.watch = function () {
  watch(['contracts/**/*'], exports.build);
}

exports.default = series(
  exports.build,
  parallel(
    exports.devnet,
    exports.watch,
  )
);

var cleanExit = function() { process.exit() };
process.on('SIGINT', cleanExit); // catch ctrl-c
process.on('SIGTERM', cleanExit); // catch kill
