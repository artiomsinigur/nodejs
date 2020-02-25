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

