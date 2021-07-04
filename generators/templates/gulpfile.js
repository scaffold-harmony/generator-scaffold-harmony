require('dotenv').config()
const config = require('./package.json').config;
const {series, parallel} = require('gulp');
const shell = require('gulp-shell');
const del = require('del');
const path = require('path');

exports.clean = function clean (cb) {
  return del([
    config.contracts_build_directory
  ], cb);
}

const compile = shell.task('truffle compile');
exports.compile = compile;

const migrate = shell.task(`truffle migrate --reset --network ${process.env.NETWORK}`)
exports.migrate = migrate;

const devnet = shell.task(`npm run harmony:devnet`);
exports.devnet = devnet;

const deploy = series(
  exports.migrate,
);
exports.deploy = deploy;

function watch () {
  require('gulp').watch(['contracts/**/*'], deploy);
}
exports.watch = watch;

const frontend = shell.task('npm install && npm start', {cwd: path.join(__dirname, 'frontend')})
exports.frontend = frontend;

exports.default = series(
  deploy,
  watch,
);

var cleanExit = function() { process.exit() };
process.on('SIGINT', cleanExit); // catch ctrl-c
process.on('SIGTERM', cleanExit); // catch kill
