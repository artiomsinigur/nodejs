const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User');
const auth = require('../middleware/auth');

/**
 * Store a task
 */
router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body);
    const task = new Task({ 
        ...req.body,
        owner: req.user._id
     });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * Find all tasks
 */
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});

        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * Find owner's tasks 
 */
// GET /tasks/owner?completed=true
router.get('/tasks/owner', auth, async (req, res) => {
    try {
        // const tasks = await Task.find({ owner: req.user._id});
        
        // or with populate
        // await req.user.populate('tasks').execPopulate();
        // res.send(req.user.tasks);

        await req.user.populate({
            path: 'tasks',
            match: {
                completed: req.query.completed === 'true'
            } 
        })
        .execPopulate();
        res.send(req.user.tasks);

        // res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});


/**
 * Find a task
 */
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * Update a task
 */
router.patch('/tasks/:id', auth, async (req, res) => {
    const keysUpdate = Object.keys(req.body);
    const allowedUpdate = ['description', 'completed'];
    const isValidOperation = keysUpdate.every(key => allowedUpdate.includes(key));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    
    try {
        // const task = await Task.findById(req.params.id);
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
        
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!task) {
            res.status(404).send();
        }

        keysUpdate.forEach((key) => task[key] = req.body[key]);
        await task.save();

        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * Delete a task
 */
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        
        if (!task) {
            res.status(404).send();
        }
        // const task = await Task.findByIdAndDelete(req.params.id);

        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});
// router.delete('/tasks/:id', async (req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id);
//         if (!task) {
//             res.status(404).send();
//         }
//         res.send();
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

module.exports = router;