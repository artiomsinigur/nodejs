const {log, error, success, danger} = require('./chalk');
const yargs = require('yargs');
const {addNote, removeNote, listNotes, readNote} = require('./notes');

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
    handler(argv) {
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
    handler(argv) {
        removeNote(argv.title);
    }
});

// Create list command
yargs.command({
    command: 'list',
    describe: 'List all resources',
    handler() {
        listNotes();
    }
});

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a resource',
    builder: {
        title: {
            describe: 'Read title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        readNote(argv.title);
    }
});

// Parsing the arguments
yargs.parse();