const mongoose = require('mongoose');

// Connect and create new database task-manager-api
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});