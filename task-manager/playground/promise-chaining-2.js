require('../src/db/mongoose');
const Task = require('../src/models/Task');

// Task.findByIdAndDelete('5e571be63e1bbc2e04aca95b')
//     .then((task) => {
//         console.log('Deleted task ' + task);
//         return Task.countDocuments({ completed: false })
//     })
//     .then((res) => {
//         console.log('Total number of incomplete tasks ' + res);
//     })
//     .catch((err) => {
//         console.log(err);
//     })


const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id);
    return await Task.countDocuments({ completed: false });
}

deleteTaskAndCount('5e572acfe4a1dc42c012231c')
    .then((count) => {
        console.log(count);
    })
    .catch((err) => {
        console.log(err);
    })