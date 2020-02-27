const bcrypt = require('bcryptjs');

// Encrypt algorithms:   pass123 -> asdk23lk4;msfsdfkmds8i83 -> pass123
// Hashe algorithms:     pass123 -> mllsidjf82374n#4mopsidffd -|

const myFunction = async () => {
    const pass = 'abc123!';
    const hashedPass = await bcrypt.hash(pass, 8);

    console.log(pass);
    console.log(hashedPass);
    
    const isMatch = await bcrypt.compare(pass, hashedPass);
    console.log(isMatch);
}

myFunction();