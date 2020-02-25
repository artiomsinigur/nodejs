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
    /* db.collection('users').insertOne({
        name: 'Artiom',
        age: 33,
        hobbit: ['Soccer', 'Tennis']
    }, (err, res) => {
        if (err) {
            return console.log('Unable to insert user!');
        }

        // ops is array of documents
        console.log(res.ops, res.insertedCount);
    });

    // Insert an many documents
    db.collection('users').insertMany([
        {
            name: 'Andrew',
            age: 18
        }, {
            name: 'Anton',
            age: 39
        }
    ], (err, res) => {
        if (err) {
            return console.log('Unable to insert user!');
        }
        console.log(res.ops, res.insertedCount);
    }); */

    // Create new tasks collection
    db.collection('tasks').insertMany([
        {
            description: 'Go to cinema',
            completed: false
        }, {
            description: 'Buy somme food',
            completed: true
        }, {
            description: 'Study about promise today',
            completed: false
        },
    ], (err, res) => {
        if (err) {
            return console.log('Unable to insert resources!');
        }
        console.log(res.ops);
    });
});