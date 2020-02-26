const mongoose = require('mongoose');
// Connect and create new collection task-manager-api
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// With Mongoose, everything is derived from a Schema. 
// Let's get a reference to it and define a User schema and compile our schema into a Model.
const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

// A model is a class with which we construct documents. 
// In this case, each document will be an instance of User with properties and behaviors as declared in our schema. 
// Let's create a user document
const me = new User({
    name: 'Andrew',
    age: 24
});

// Save to DB
// save() return a Promise
me.save()
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.error('Error!', err);
})