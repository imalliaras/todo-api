const {SHA256} = require('crypto-js');

const message = 'I am user number 3';
const hash = SHA256(message);
const hashString = SHA256(message).toString();

console.log('typeof hash', typeof hash);
console.log('message', message);
console.log('hash', hash);
console.log('hashString', hashString);