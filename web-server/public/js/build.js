console.log('Client side JS file is loaded!');

fetch('http://localhost:3000/weather?address=montreal')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    });