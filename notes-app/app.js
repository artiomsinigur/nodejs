const {log, error, success, danger} = require('./chalk');
const yargs = require('yargs');
const getNotes = require('./notes');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Store new resource',
    builder: {
        title: {
            describe: 'Resource title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Body content',
            demandOption: false,
            type: 'string', 
        }
    },
    handler: function (argv) {
        console.log(log('Title: ' + argv.title));
        console.log(log('Body: ' + argv.body));
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
    describe: 'List all resources',
    handler: function () {
        console.log(log('Listing all resources!'));
    }
});

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a resource',
    handler: function () {
        console.log(log('Reading a resource!'));
    }
});

// Parsing the arguments
yargs.parse();
// console.log(yargs.argv);