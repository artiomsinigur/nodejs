// Async function always return a Promise
// const doWork = async () => {
//     throw new Error('Something goes wrong!');
//     return 'Artiom';
// }
// console.log(doWork());


function add(x, y) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (x < 0 || y < 0) {
                return reject(new Error('Numbers must be non-negative!'));
            }
            resolve(x + y);
        }, 2000);
    });
}

const doWork = async () => {
    const sum = await add(1, 99);
    const sum2 = await add(sum, 50);
    const sum3 = await add(sum2, 5);
    return sum3;
}

// Promise chaining do the same thinks
// add(1, 3)
//     .then((sum) => {
//         return add(sum, 2);
//     })
//     .then((sum2) => {
//         return add(sum2, 3);
//     })
//     .then((sum3) => {
//         console.log(sum3);
//     })
//     .catch((err) => {
//         console.log(err);
//     })


doWork()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })