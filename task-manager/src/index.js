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


const bcrypt = require('bcryptjs');

// Encrypt algorithms:   pass123 -> asdk23lk4;msfsdfkmds8i83 -> pass123
// Hashe algorithms:     pass123 -> mllsidjf82374n#4mopsidffd -|

const myFunction = async () => {
    const pass = 'abc123!';
    const hashedPass = await bcrypt.hash(pass, 8);

    console.log(pass);
    console.log(hashedPass);
    
    const isMatch = await bcrypt.compare(pass, hashedPass);
    console.log(isMatch);
}
// myFunction();