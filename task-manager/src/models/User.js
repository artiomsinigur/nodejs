const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./Task');

// This allowed to take advantage of middleware
// To apply a unique property follow next steps:
    // 1) Remove all documents from the users collection.
    // 2) From the mongo shell, execute the command: db.users.createIndex({email: 1}, {unique: true})

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
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        // Custom validation
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});

// virtual relationship between collections User and Task
userSchema.virtual('tasks', {
    ref: 'Task', // collection
    localField: '_id', // of the user
    foreignField: 'owner' // field from Task collection
})

/**
 * Get public profile and hide sensitive data
 * This method will apply for every route where we show user data
 */
userSchema.methods.toJSON = function () {
    const user = this;
    // Convert in normal Object
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}

/**
 * Generate token
 * Methods is instance of document
 */
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    // Convert _id to String because user._id is object
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismysecretkey');

    // Store token
    // user.tokens = user.tokens.concat({ token });
    user.tokens.push({ token });
    await user.save();

    return token;
};

/**
 * Login
 * Define a personal method
 */
userSchema.statics.findByCredentials = async (email, password) => {
    // Step 1 find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login!');
    }

    // Step 2 check given password with password form DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login!');
    }

    return user;
}

// You must add all middleware and plugins BEFORE calling `mongoose.model().
// pre - doing somethings BEFORE
// post - doing somethings AFTER
/**
 * Middleware - Hash the plaintext password
 */
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

/**
 * Middleware - Delete user tasks when user is deleted
 */
userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    
    next();
})



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