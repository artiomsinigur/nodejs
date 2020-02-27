const express = require('express');
const app = express();
// Load file to connect mongoose to the DB
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const PORT = process.env.PORT || 3000;

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
app.use((req, res, next) => {
    res.status(503).send('Site currently is in maintenance mode. Check back soon!');
});


// Setup express to automatically parse the incoming json data to object
app.use(express.json());

// Record user router
app.use(userRouter);
// Record task router
app.use(taskRouter);



app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});
