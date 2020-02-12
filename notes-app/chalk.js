const chalk = require('chalk');

const log = chalk.blue.bold;
const error = chalk.bgRed.bold;
const success = chalk.green.inverse.bold;
const danger = chalk.red.inverse.bold;

module.exports = {log, error, success, danger};