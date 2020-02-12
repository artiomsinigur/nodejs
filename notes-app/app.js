const {log, error, success, danger} = require('./chalk');
const yargs = require('./yargs');
const {getNotes, addNote, removeNote} = require('./notes');

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
        addNote(argv.title, argv.body);
    }
});

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Destroy a resource',
    builder: {
        title: {
            describe: 'Resource title',
            demandOption: true,
            type: 'string'
        },
    },
    handler: function (argv) {
        console.log(danger('Removed' + argv.title));
        removeNote(argv.title);
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