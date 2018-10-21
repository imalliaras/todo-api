const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB server');
        return;
    }
    console.log('Connected to MongoDB server.');

    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5bcc121a7a0c852a1f79625d')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // }, (error) => {
    //     console.log(error);
    // });
    // client.close();

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5bcb1fbe08f56e2e9ccba622')
    }, {
        $set: { name: 'John' },
        $inc: { age: 1 }
    }, {
        returnOriginal: false
    }).then((results) => {
        console.log(results);
    });
});

