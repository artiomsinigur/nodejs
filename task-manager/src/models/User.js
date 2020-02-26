const mongoose = require('mongoose');
const validator = require('validator');

// With Mongoose, everything is derived from a Schema. 
// Let's get a reference to it and define a User schema and compile our schema into a Model.
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('String <<password>> is not allowed!');
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        // Custom validate
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email must be valid!');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number!');
            }
        }
    }
});

/*
// A model is a class with which we construct documents. 
// In this case, each document will be an instance of User with properties and behaviors as declared in our schema. 
// Let's create a user document
const me = new User({
    name: '  Ben',
    password: 'thisislongpass',
    email: 'JIM@google.com',
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
*/

module.exports = User;