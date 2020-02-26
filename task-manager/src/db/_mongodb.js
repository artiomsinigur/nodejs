// CRUD create read update delete

// Store everything from mongodb API (return an Object) 
const mongodb = require('mongodb');
// Initialize the connection. Give access to the functions necessary to connect to DB
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// Generate a new id
const ObjectID = mongodb.ObjectID;
// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());


// Connecting to the database
MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to DB!');
    }

    // Create a DB directly hire. No need to create it in mongodb GUI 
    const db = client.db(databaseName);

    // CREATE
    // ==============================
        // Insert an single document
        /* db.collection('users').insertOne({
            name: 'John',
            age: 33,
        }, (err, res) => {
            if (err) {
                return console.log('Unable to insert user!');
            }

            // ops is array of documents
            console.log(res.ops, res.insertedCount);
        }); */

        // Create new tasks collection
        // Insert an many documents
        /* db.collection('tasks').insertMany([
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
        }); */


    // READ
    // ==============================
        // Find one document
        // Find by id
        // db.collection('users').findOne({_id: new ObjectID('5e557812e87dce25f480fbad')}, (err, user) => {
        // Find by name
        // db.collection('users').findOne({name: 'Artiom'}, (err, user) => {
        //     if (err) {
        //         return console.log('Unable to find the user');
        //     }
        //     console.log(user);
        // });

        // With promise - If use promise no need callback function
        // db.collection('users').findOne({name: 'Artiom'})
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.error(res);
        //     })

        // Find many
        // db.collection('users').find({ age: 33, name: 'John' }).toArray((err, document) => {
        //     if (err) {
        //         return console.log('Unable to find the user');
        //     }
        //     console.log(document);
        // });

        
    // UPDATE
    // http://mongodb.github.io/node-mongodb-native/3.5/api/Collection.html#updateOne
    // https://docs.mongodb.com/manual/reference/operator/update-field/
    // ==============================
        // Update a document's field with a filter $set or $inc
        // db.collection('users').updateOne({
        //     _id: new ObjectID('5e556402ea814952bc78086d')
        // }, {
        //     $set: {
        //         name: 'Leo'
        //     },
        //     $inc: {
        //         age: 1
        //     }
        // })
        // .then((res) => {
        //     console.log('Updated', res);
        // })
        // .catch((err) => {
        //     console.log('Something goes wrong!', err);
        // })

        // Update many documents
        // db.collection('tasks').updateMany({
        //     completed: false
        // }, {
        //     $set: {
        //         completed: true
        //     }
        // })
        // .then((res) => {
        //     console.log('Updated');
        // })
        // .catch((err) => {
        //     console.error('Unable to update');
        // })


    // DELETE
    // ==============================
        // Delete one document
        // db.collection('users').deleteOne({
        //     name: 'Andrew'
        // })
        // .then((res) => {
        //     console.log('Deleted');
        // })
        // .catch((err) => {
        //     console.log(err);
        // })
        
        // Delete many documents
        // db.collection('users').deleteMany({
        //     age: 33
        // })
        // .then((res) => {
        //     console.log('Deleted', res);
        // })
        // .catch((err) => {
        //     console.log(err);
        // })
        
});