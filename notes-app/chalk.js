const chalk = require('chalk');

const error = chalk.bgRed.bold;
const success = chalk.green.inverse.bold;
const log = chalk.blue.bold;

module.exports = {log, error, success};