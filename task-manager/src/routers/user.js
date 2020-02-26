const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Find all users
router.get('/users', (req, res) => {
    User.find({})
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            res.status(500).send();
        })
});

module.exports = router;