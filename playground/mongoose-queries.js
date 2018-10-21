const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// const id = '5bcc4374a549a757f492c6d211';

// if (!ObjectID.isValid(id)) {
//     console.log('Id not valid');
// }

// Todo.findById(id).then((todos) => {
//     if (!todos) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todos);
// }).catch((err) => {
//     console.log(err);
// });

const userId = '5bcc27e5abef5a4d48f06cd2';

User.findById(userId).then((user) => {
    if (!user) {
       return console.log('User not found.'); 
    }
    console.log('User: ', user);
}).catch((err) => {
    console.log("Error: ", err);
});