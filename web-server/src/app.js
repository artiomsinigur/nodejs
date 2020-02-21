const express = require('express');

const app = express();

// req - incoming request to the server
// res - response have a bunch of methods that allow us to customize what we want to send to requester
// app.com
app.get('', (req, res) => {
    res.send('Hello world!');
});
// app.com/about
app.get('/about', (req, res) => {
    res.send('You are on page about');
});
// app.com/weather
app.get('/weather', (req, res) => {
    res.send('You are on page weather');
});

// Start server
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});