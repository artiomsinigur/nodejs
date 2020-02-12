const {log, error, success} = require('./chalk');
const getNotes = require('./notes');

// Get arguments form user in CLI
const command = process.argv[2];

if (command === 'add') {
    console.log(success('Store some note!'));
} else if(command === 'remove') {
    console.log(success('Remove note!'));
}