const Task = require('../src/models/Task');
const User = require('../src/models/User');

const main = async () => {
    // Get owner of task
    // const task = await Task.findById('5e589969803ee85994e2c675');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);
    
    // Get user's tasks
    const user = await User.findById('5e5896c08ae86a4058ebf2cb');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);
}

main();