const express = require('express');
const auth = require('../middleware/auth'); // Call me before router
const User = require('../models/User');
const multer = require('multer');
const router = new express.Router();

/**
 * Find user by id
 */
// const findUserById = async (req, res) => {
//     const _id = req.params.id;

//     try {
//         const user = await User.findById(_id);

//         if (!user) {
//             return res.status(404).send();
//         }

//         res.send(user);
//     } catch (error) {
//         res.status(500).send();
//     }    
// };
// router.get('/users/:id', findUserById); 

/**
 * Find profile of current user
 */
router.post('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

/**
 * Store new user
 */
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    
    try {
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * Login user
 */
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * Logout user
 */
router.post('/users/logout', auth, async (req, res) => {
    try {
        // If login on multiply devices, logout only from actual. Kep login on others devices
        // Delete the token that are equal with the current token from tokens array
        req.user.tokens = req.user.tokens.filter(item => item.token !== req.token);
        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * Logout user form all devices
 */
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * Update an user
 */
router.patch('/users/me', auth, async (req, res) => {
    const keysUpdate = Object.keys(req.body);
    const allowedUpdate = ['name', 'password', 'email', 'age'];
    const isValidOperation = keysUpdate.every(key => allowedUpdate.includes(key));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        // Model.update,findByIdAndUpdate,findOneAndUpdate,findOneAndRemove,findByIdAndRemove are all commands executed directly in the database. So that why pre, post middleware are not executed.
        // The only way to get the hooks to execute is to use separate find() and save() calls as mentioned above.
        
        keysUpdate.forEach((key) => req.user[key] = req.body[key]);
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// router.patch('/users/:id', auth, async (req, res) => {
//     const keysUpdate = Object.keys(req.body);
//     const allowedUpdate = ['name', 'password', 'email', 'age'];
//     const isValidOperation = keysUpdate.every(key => allowedUpdate.includes(key));

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' });
//     }

//     try {
//         // Model.update,findByIdAndUpdate,findOneAndUpdate,findOneAndRemove,findByIdAndRemove are all commands executed directly in the database. So that why pre, post middleware are not executed.
//         // The only way to get the hooks to execute is to use separate find() and save() calls as mentioned above.
//         const user = await User.findById(req.params.id);
//         keysUpdate.forEach((key) => user[key] = req.body[key]);
//         await user.save();
        
//         // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
//         // if non user founded
//         if (!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

/**
 * Delete user
 */
router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id);
        // if (!user) {
        //     return res.status(404).send();
        // }

        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * Upload image
 */
// Configuration
    // Create an instance
const upload = multer({
    dest: 'img/avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        // if (!file.originalname.endsWith('.pdf')) {
        //     return cb(new Error('Please upload a PDF')); // Reject file with a message
        // }
        // or with regex
        if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|doc|docx)$/)) {
            return cb(new Error('Please upload files only with following extensions: JPG, JPEG, PNG, PDF, DOCX or DOC'));
        }
        cb(undefined, true); // Accept the file
    }
})



// upload.single('avatar') - is the name(avatar) for the key when registering the middleware

// We can set own middleware
// const errorMiddleware = (req, res, next) => {
//     throw new Error('My error from middleware');
// }
// then replace upload.single('avatar') by errorMiddleware

// or handle error with an callback all followed params arr required (error, req, res, next)
router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

module.exports = router;