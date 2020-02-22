const path = require('path'); // Usually we include path before express
const express = require('express');
const nunjucks = require('nunjucks');
// const getGeocoding = require('../../weather-app/utils/geocoding');
// const getForecast = require('../../weather-app/utils/forecast');

const app = express();

// Define render view engine hbs(handlebar)
// app.set('view engine', 'hbs');

// Defined the engine of template
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// to watching many extensions write with nodemon we write: nodemon app.js -e js,html

// Get the path to public folder to send index.html file
const publicDirectoryPath = path.join(__dirname, '../public'); // if app.js was in src folder we access ../public 

// If we change the name of the folder view, we need to redefine it
// const viewPath = path.join(__dirname, '../templates'); 
// app.set('views', viewPath);

// app.use() - customize the server
    // Load all static html files, css, img, and js from public folder(index.html is by default)
app.use(express.static(publicDirectoryPath));

// Routes
// req - incoming request to the server
// res - response have a bunch of methods that allow us to customize what we want to send to requester
app.get('', (req, res) => {
    res.render('index.html', {
        title: 'Title de page',
        courses: [
            {lesson: 'NodeJs'},
            {lesson: 'JS'},
            {lesson: 'HTML et CSS'},
        ],
    });
});

app.get('/about', (req, res) => {
    res.render('about.html');
})

app.get('/weather', (req, res) => {
    res.render('weather.html');
})


// Start server
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});