const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const userId = '5bcc27e5abef5a4d48f06cd2';
const todoId = '5bcc80d17a0c852a1f79d20e';
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove

// Todo.findByIdAndRemove

Todo.findByIdAndRemove(todoId).then((result) => {
    console.log(result);
});