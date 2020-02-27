const express = require('express');
const app = express();
// Load file to connect mongoose to the DB
require('./db/mongoose');
const User = require('./models/User');
const Task = require('./models/Task');

const PORT = process.env.PORT || 3000;

// Setup express to automatically parse the incoming json data to object
app.use(express.json());

//Find user by id
// app.get('/users/:id', (req, res) => {
//     const _id = req.params.id;

//     User.findById(_id)
//         .then((user) => {
//             // If no user founded
//             if (!user) {
//                 return res.status(404).send();
//             }
//             res.send(user);
//         })
//         .catch((err) => {
//             res.status(500).send();
//         });
// });

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        res.status(500).send();
    }    
});

// Find all users
// app.get('/users', (req, res) => {
//     User.find({})
//         .then((users) => {
//             res.send(users);
//         })
//         .catch((err) => {
//             res.status(500).send();
//         })
// });

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send();
    }
});

// Store new user
// app.post('/users', (req, res) => {
//     const user = new User(req.body);
    
//     user.save()
//         .then(() => {
//             res.status(201).send(user);
//         })
//         .catch((err) => {
//             res.status(400).send(err);
//         })
// });

const storeUser = async (req, res) => {
    const user = new User(req.body);
    
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}
app.post('/users', storeUser);



// Store a task
// app.post('/tasks', (req, res) => {
//     const task = new Task(req.body);

//     task.save()
//         .then((task) => {
//             res.status(201).send(task);
//         })
//         .catch((err) => {
//             res.status(400).send(err);
//         })
// });


app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Find all tasks
// app.get('/tasks', (req, res) => {
//     Task.find({})
//         .then((tasks) => {
//             res.send(tasks);
//         })
//         .catch((err) => {
//             res.status(500).send(err);
//         })
// });

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Find a task
// app.get('/tasks/:id', (req, res) => {
//     const _id = req.params.id;

//     Task.findById(_id)
//         .then((task) => {
//             if (!task) {
//                 return res.status(404).send();
//             }
//             res.send(task);
//         })
//         .catch((err) => {
//             res.status(500).send(err);
//         })
// });

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);

        if (!task) {
            res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});




app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});