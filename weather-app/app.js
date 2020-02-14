const request = require('request');

const urlForecast = 'https://api.darksky.net/forecast/75d2b09a4815455f3e41ecddc78b67cd/37.8267,-122.4233?units=si&lang=fr&timezone=America/Toronto';

request({url: urlForecast, json: true}, (err, res) => {
    const weather = res.body.currently;
    const daily = res.body.daily.data;
    const textNode = `It is currently ${weather.temperature} degrees out. There is a ${weather.precipProbability}%. ${daily[0].summary}`;
    // console.log(textNode);
});

const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Montr%C3%A9al.json?access_token=pk.eyJ1IjoiYXJ0ZGV2IiwiYSI6ImNrNmxsbWt1ZDBkYTQzbW4wOWhhNHFma20ifQ.sXo-BYsA3ZJCIeo-iNsLYw&limit=1';

request({url: geocodeUrl, json: true}, (err, res) => {
    const latitude = res.body.features[0].center[0];
    const longitude = res.body.features[0].center[1];
    console.log(latitude, longitude);
});