const request = require('request');

function getForecast(geocode, callback) {
    const urlForecast = 'https://api.darksky.net/forecast/75d2b09a4815455f3e41ecddc78b67cd/' + geocode.longitude + ',' + geocode.latitude + '?units=si&lang=fr';
    
    request({url: urlForecast, json: true}, (err, res) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined);
        } else if (res.body.error) {
            callback(res.body.error, undefined);
        } else {
            const weather = res.body.currently;
            const daily = res.body.daily.data;
            const textNode = `It is currently ${weather.temperature} degrees out. There is a ${weather.precipProbability}%. ${daily[0].summary}`;
            callback(undefined, textNode);
        }
    });
}

module.exports = getForecast;