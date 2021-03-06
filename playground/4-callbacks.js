const names = ['Andrew', 'Jeff', 'Jen'];
const shortNames = names.filter((name) => name.length <= 4);

const geoCode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0,
        }

        callback(data);
    }, 2000);
};

geoCode('New York', (data) => {
    console.log(data);
});

// Challenge
function add(a, b, getSum) {
    setTimeout(() => {
        const sum = a + b;
        getSum(sum);
    }, 2000);
}

add(1, 4, (sum) => {
    console.log(sum);
});


// Basic example of callback
function doCallback(callback) {
    setTimeout(() => {
        // callback('My error', undefined);
        callback(undefined, [1, 5, 8]);
    }, 2000);
}

doCallback((err, res) => {
    if (err) {
        return console.error(err);
    } else {
        console.log(res);
    }
});