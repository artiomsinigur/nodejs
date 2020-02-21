const path = require('path'); // Usually we include path before express
const express = require('express');
// const getGeocoding = require('../../weather-app/utils/geocoding');
// const getForecast = require('../../weather-app/utils/forecast');

const app = express();

// Get the path to public folder to send index.html file
const publicDirectoryPath = path.join(__dirname, '../public');
// app.use() - customize the server
    // Load all html files from public folder(index.html is by default)
app.use(express.static(publicDirectoryPath));

// req - incoming request to the server
// res - response have a bunch of methods that allow us to customize what we want to send to requester
// app.com/about
// app.get('/about', (req, res) => {
//     res.send({
//         name: 'Andrew',
//         age: 31,
//     });
// });

// Load weather page
// app.com/weather
// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'Forecast',
//         location: 'Montreal',
//     });
// });

// Start server
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});