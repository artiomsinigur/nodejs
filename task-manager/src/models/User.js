const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// This allowed to take advantage of middleware
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (validator.isNumeric(value)) {
                throw new Error('Number is not allowed!');
            }
        }
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

// You must add all middleware and plugins BEFORE calling `mongoose.model().
// pre - doing somethings BEFORE
// post - doing somethings AFTER
userSchema.pre('save', async function(next) {
    // this will refer the actual document(user)
    const user = this;

    console.log('Just before saving!');

    if (user.isModified('password')) {
        // Hash pass. Take the plain text password and override it with hashed pass
        user.password = await bcrypt.hash(user.password, 8);
    }

    // Call next when we are done
    next();
});

// With Mongoose, everything is derived from a Schema. 
// Let's get a reference to it and define a User schema and compile our schema into a Model.
const User = mongoose.model('User', userSchema);






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