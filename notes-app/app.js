const {log, error, success, danger} = require('./chalk');
const yargs = require('yargs');
const getNotes = require('./notes');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Store new resource',
    handler: function () {
        console.log(log('Adding new resource!'));
    }
});

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Destroy a resource',
    handler: function () {
        console.log(danger('Removing a resource!'));
    }
});

// Create list command
yargs.command({
    command: 'list',
    describe: 'Show a list of resource',
    handler: function () {
        console.log(log('Showing a list of resource!'));
    }
});

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read resource',
    handler: function () {
        console.log(log('Reading resource!'));
    }
});

console.log(yargs.argv);