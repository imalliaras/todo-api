const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

const hashed = '$2a$10$ByDpJDFkmXadBN9t1A8bqujTCiAwp76to5ewejb9JRRfGTkxSD8c6';

bcrypt.compare(password, hashed, (err, result) => {
    console.log(result);
})

// const data = {
//     id: 10
// }

// const token = jwt.sign(data, '123abc');

// console.log("token", token);

// const decoded = jwt.verify(token, '123abc');

// console.log("decoded", decoded);

// const message = 'I am user number 3';
// const hash = SHA256(message);
// const hashString = SHA256(message).toString();

// console.log('typeof hash', typeof hash);
// console.log('message', message);
// console.log('hash', hash);
// console.log('hashString', hashString);

// const data = {
//     id: 4
// };

// const token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not trust');
// }