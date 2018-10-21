const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB server');
        return;
    }
    console.log('Connected to MongoDB server.');

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo');
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Todos').find({
    //     _id: new ObjectID('5bcb192e1e27e13cc41e82f2')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }), (err) => {
    //     console.log('Unable to fetch todos', err);
    // };

    // db.collection('Users').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }), (err) => {
    //     console.log('Unable to fetch todos', err);
    // };

    db.collection('Users').find({name: 'John'}).toArray().then((res) => {
        console.log(JSON.stringify(res, undefined, 2))
    });

    client.close();
});

