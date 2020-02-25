// CRUD create read update delete

// Store everything from mongodb API (return an Object) 
const mongodb = require('mongodb');
// Initialize the connection. Give access to the functions necessary to connect to DB
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// Connecting to the database
MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to DB!');
    }

    // Create a DB directly hire. No need to create it in mongodb GUI 
    const db = client.db(databaseName);

    // Insert an single document
    db.collection('users').insertOne({
        name: 'Artiom',
        age: 33
    });
});