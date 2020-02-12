const fs = require('fs');
const {success, error} = require('./chalk');

const getNotes = function() {
    return 'My notes...';
}

// Store new resource
const addNote = function(title, body) {
    // If problem with loadData return an empty array and stop
    const notes = loadNotes();

    // Check if note title exist already
    const duplicateNotes = notes.filter(note => {
        return note.title === title;
    });

    // Prevents duplicated notes to be added
    if (duplicateNotes.length > 0) {
        console.log('Duplicate of notes');
    } else {
        // Otherwise store data
        notes.push({title, body});
        storeNotes(notes);
        console.log('Notes was stored successfully!');
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

// Write data into file
const storeNotes = function(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

// Remove note 
const removeNote = function(title) {
    const originalNotes = loadNotes();

    // Return all notes that are different of current one
    const notesToKeep = originalNotes.filter(note => {
        return note.title !== title;
    });

    if (originalNotes.length !== notesToKeep.length) {
        storeNotes(notesToKeep);
        console.log(success('Note removed!'));
    } else {
        console.log(error('No note found!'));
    }
}

module.exports = {getNotes, addNote, removeNote};