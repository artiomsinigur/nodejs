const jwt = require('jsonwebtoken');
const User = require('../models/User');

// const auth = async (req, res, next) => {
//     try {
//         // Take token from header Authorization
//         // replace('Bearer ', '') delete Bearer string from token of header
//         const token = req.header('Authorization').replace('Bearer ', '');

//         // Check token from header with secret key from model User
//         const decoded = jwt.verify(token, 'thisismysecretkey');

//         // Grape the id from decoded token and check if the given token are in the user's tokens array
//         const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

//         if (!user) {
//             throw new Error();
//         }

//         // Give to that route handler access to the user that we fetched from the DB
//         req.user = user;

//         // If the user proved the right token we go on
//         next();
//     } catch (error) {
//         res.status(401).send({ error: 'Please authenticate!' });
//     }
// }


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismysecretkey')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}


// Without middleware   -> new request -> run route handler
// With middleware      -> new request -> do something else (is a regular function) -> run route handler

// Call all middlewares earlier than routes
// app.use((req, res, next) => {
//     // console.log(req.method, req.path);
//     // if (req.method === 'GET') {
//     //     res.send('Get request are disabled!');
//     // } else {
//     //     next();
//     // }

//     // If we don't call next, middleware will never run route
//     // next();
// });

// Setup a middleware for maintenance mode
// Set a middleware for every single routes
// app.use((req, res, next) => {
//     res.status(503).send('Site currently is in maintenance mode. Check back soon!');
// });

module.exports = auth;