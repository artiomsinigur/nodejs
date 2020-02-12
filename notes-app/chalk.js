const chalk = require('chalk');

const error = chalk.bgRed.bold;
const success = chalk.bgGreen.bold;
const log = chalk.blue.bold;

module.exports = {log, error, success};