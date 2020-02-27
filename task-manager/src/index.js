const express = require('express');
const app = express();
// Load file to connect mongoose to the DB
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const PORT = process.env.PORT || 3000;

// Setup express to automatically parse the incoming json data to object
app.use(express.json());

// Record user router
app.use(userRouter);
// Record task router
app.use(taskRouter);



app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});
