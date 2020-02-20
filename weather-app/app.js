const {error, success} = require('../notes-app/chalk');
const getGeocoding = require('./utils/geocoding'); 
const getForecast = require('./utils/forecast'); 

let address = process.argv[2];

getGeocoding(address, (err, data) => {
    if (err) {
        return console.log(error(err));
    }
    
    getForecast(data, (err, forecastData) => {
        if (err) {
            return console.log(error(err));
        }
        console.log(success(data.placeName));
        console.log(success(forecastData));
    });
});

// const geocode = getGeocoding('Chisinau', getGeocode);
// function getGeocode(err, data) {
    //     return data;
// }
// console.log(geocode);