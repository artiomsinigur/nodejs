require('../src/db/mongoose');
const User = require('../src/models/User');

// User.findByIdAndUpdate('5e55cbd92923f45c6cbc2e7b', { age: 1 })
//     .then((user) => {
//         console.log(user);
//         return User.countDocuments({ age: 1 })
//     })
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     })


// Now, do the same things with async/await
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
}

updateAgeAndCount('5e55e973fa01544fb8c2bc86', 2)
    .then((count) => {
        console.log(count);
    })
    .catch((err) => {
        console.log(err);
    })




/* User.find({ age: 0 })
    .then((users) => {
        console.log(users);
        return User.countDocuments({ age: 0 })
    })
    .then((res) => {
        console.log('User with age 0: ' + res);
        return User.updateMany({ age: 0 }, { age: 1 });
    })
    .then((res) => {
        if (res.n) {
            console.log('Success! Users with age 0 updated! ' + res.nModified);
        } else {
            console.log('Error! No users founded!');
        }
        return User.find({ age: 1 })
    })
    .then((users) => {
        console.log(users);
        return User.countDocuments({ age: 1 });
    })
    .then((countAll) => {
        console.log('Users with age 1: ' + countAll);
    })
    .catch((err) => {
        console.error(err);
    })

    // find users with age 0
    // log them
    // count them
    // 
    // users with age 0 update to 1
    // log them
    // count them */