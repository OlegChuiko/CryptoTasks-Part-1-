const fs = require('fs');
const crypto = require('crypto');


const FILE = 'hashedPassword.txt';


function HashPassAndSaveToFile(pass)
{
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(pass, salt, 1000, 64, 'sha512').toString('hex');

    fs.writeFileSync(FILE, `${salt}\n${hash}`);
    console.log('password saved')
}


function PasswordVerification(pass)
{
    const [salt, hash] = fs.readFileSync(FILE).toString().split('\n');
    const inputHash = crypto.pbkdf2Sync(pass, salt, 1000, 64, 'sha512').toString('hex');

    if (hash === inputHash) 
        console.log('The password is correct'); 
    else   
        console.log('The password is does not correct');
}

PasswordVerification('parol')

