// Load File System
const fs = require('fs');
// fs.writeFileSync('notes.txt', 'This file was created and changed by NodeJs');

// Add some text to notes.txt
fs.appendFileSync('notes.txt', 'This text was added with NodeJs');