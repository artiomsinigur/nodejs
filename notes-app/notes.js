const fs = require('fs');
const {log, success, error} = require('./chalk');

// To start debugging, write word key debugger, than in CLI write node inspect(after restart) app.js add ...
// Go to chrome and write chrome://inspect 
// debugger;

/**
 * Store new resource
 * @param {string} title 
 * @param {string} body 
 */
const addNote = function(title, body) {
    // If problem with loadData return an empty array and stop
    const notes = loadNotes();

    // Check if note title exist already
    const duplicateNotes = notes.find(note => note.title === title);

    // Prevents duplicated notes to be added
    if (duplicateNotes === undefined) {
        // Otherwise store data
        notes.push({title, body});
        storeNotes(notes);
        console.log(success('Notes stored successfully!'));
    } else {
        console.log(error('Duplicate of notes'));
    }
}

/**
 * Load data from the file
 * @return array of objects
 */
const loadNotes = function() {
    try {
        // Read json data
        const dataJSON = fs.readFileSync('notes.json').toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        // if file not exist, return an empty array and create an empty file 
        return [];
    }
}

/**
 * Write data into file
 * @param {object} notes 
 */
const storeNotes = function(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

/**
 * Remove note 
 * @param {string} title 
 */
const removeNote = function(title) {
    const originalNotes = loadNotes();

    // Return all notes that are different of current one
    const notesToKeep = originalNotes.filter(note => note.title !== title);

    if (originalNotes.length !== notesToKeep.length) {
        storeNotes(notesToKeep);
        console.log(success('Note removed!'));
    } else {
        console.log(error('No note found!'));
    }
}

/**
 * List all notes
 */
const listNotes = function() {
    const notes = loadNotes();

    // Show every note from the file
    console.log(log('Your notes'));
    notes.forEach(note => {
        console.log(note.title);
    });
}

/**
 * Read note
 * @param {string} title 
 */
const readNote = function(title) {
    const notes = loadNotes();
    // Retrieve the first note found
    const note = notes.find(note => note.title === title);

    // If no note found display error
    if (note !== undefined) {
        console.log(success(note.title));
        console.log(log(note.body));
    } else {
        console.log(error('No note found!'));
    }
}

module.exports = {addNote, removeNote, listNotes, readNote};