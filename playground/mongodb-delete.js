const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB server');
        return;
    }
    console.log('Connected to MongoDB server.');

    const db = client.db('TodoApp');

    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todos').findOneAndDelete({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({name: 'John'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').deleteOne({_id: new ObjectID('5bcb1a8f9158b035d40245b9')}).then((result) => {
        console.log(result);
    });

    client.close();
});

