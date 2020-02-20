const {error, success} = require('../notes-app/chalk');
const getGeocoding = require('./utils/geocoding'); 
const getForecast = require('./utils/forecast'); 

let address = process.argv[2];

getGeocoding(address, (err, {longitude, latitude, placeName}) => {
    if (err) {
        return console.log(error(err));
    }
    
    getForecast(longitude, latitude, (err, forecastData) => {
        if (err) {
            return console.log(error(err));
        }
        console.log(success(placeName));
        console.log(success(forecastData));
    });
});