const mongoose = require('mongoose');

// Create new collection tasks
// Define schema
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    completed: {
        type: Boolean,
        default: false,
    }
})

module.exports = Task;