const jwt = require('jsonwebtoken');

const myFunction = async () => {
    const token = jwt.sign({ _id: 'myidwillbehere' }, 'thisismysecretkey', { expiresIn: '1 days' });
    const data = jwt.verify(token, 'thisismysecretkey');

    console.log(data);
}

myFunction();