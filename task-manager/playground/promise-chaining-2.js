require('../src/db/mongoose');
const Task = require('../src/models/Task');

Task.findByIdAndDelete('5e571be63e1bbc2e04aca95b')
    .then((task) => {
        console.log('Deleted task ' + task);
        return Task.countDocuments({ completed: false })
    })
    .then((res) => {
        console.log('Total number of incomplete tasks ' + res);
    })
    .catch((err) => {
        console.log(err);
    })