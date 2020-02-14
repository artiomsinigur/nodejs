const {error, success} = require('../notes-app/chalk');
const request = require('request');

// const urlForecast = 'https://api.darksky.net/forecast/75d2b09a4815455f3e41ecddc78b67cd/37.8267,-122.4233?units=si&lang=fr&timezone=America/Toronto';

// request({url: urlForecast, json: true}, (err, res) => {
//     if (err) {
//         console.log(error('Unable to connect to weather service!'));
//     } else if (res.body.error) {
//         console.log(error(res.body.error));
//     } else {
//         const weather = res.body.currently;
//         const daily = res.body.daily.data;
//         const textNode = `It is currently ${weather.temperature} degrees out. There is a ${weather.precipProbability}%. ${daily[0].summary}`;
//         console.log(success(textNode));
//     }
// });

const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Montr%C3%A9al.json?access_token=pk.eyJ1IjoiYXJ0ZGV2IiwiYSI6ImNrNmxsbWt1ZDBkYTQzbW4wOWhhNHFma20ifQ.sXo-BYsA3ZJCIeo-iNsLYw&limit=1';

request({url: geocodeUrl, json: true}, (err, res) => {
    if (err) {
        console.log(error('Unable to connect to weather service!'));
    } else if (res.body.message) {
        console.log(error(res.body.message));
    } else if (res.body.features.length === 0) {
        console.log(error('Unable to find location. Try another search!'));
    } else {
        const latitude = res.body.features[0].center[0];
        const longitude = res.body.features[0].center[1];
        console.log(latitude, longitude);
    }
});