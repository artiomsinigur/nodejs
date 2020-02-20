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