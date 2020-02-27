// Create and store promise in variable
const doWorkPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve([1, 5, 8]);
            reject('My error');
        }, 2000);
    });

doWorkPromise
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    })


// Or create and store in function
function doWorkPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve([1, 5, 8]);
            reject('My error');
        }, 2000);
    });
}

doWorkPromise()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    })


// Promise Chaining
function add(x, y) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x + y);
        }, 2000);
    });
}

add(1, 3)
    .then((sum) => {
        console.log(sum);
        return add(sum, 2);
    })
    .then((sum2) => {
        console.log(sum2);
    })
    .catch((err) => {
        console.log(err);
    })