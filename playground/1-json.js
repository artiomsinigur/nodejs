const fs = require('fs');

// const book = {
//     title: 'Title of the book',
//     author: 'Somebody great'
// };

// const bookJSON = JSON.stringify(book);
// Create a file with JSON data
// fs.writeFileSync('1-json.json', bookJSON);

// Than, read and return data on bit format from json file
// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJSON = dataBuffer.toString();

// // Finlay, parse JSON data to object
// const book = JSON.parse(dataJSON);
// console.log(book);


// Read JSON file
const dataJSON = fs.readFileSync('1-json.json').toString();

// Change data
const dataObj = JSON.parse(dataJSON);
dataObj.name = 'Artiom';
dataObj.planet = 'Mars';
dataObj.age = 31;

// Stringify data to JSON
const updatedData = JSON.stringify(dataObj);

// Overwrite the original data
fs.writeFileSync('1-json.json', updatedData);