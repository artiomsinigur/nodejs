const {log, error, success} = require('./chalk');

const getNotes = require('./notes');

const result = getNotes();
console.log(error('This is an error message'));
console.log(success('This is an success message'));
console.log(log('This is an ordinary message'));