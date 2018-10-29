require('./config/config');
const fs = require('fs');

const _ = require('lodash');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const multer = require('multer');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3000;
// const upload = multer();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/todos', authenticate, (req, res) => {
    console.log('Posting todo...');
    const todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    });
});

app.get('/todos', authenticate, (req, res) => {
    console.log('Getting todos...');
    Todo.find({
        _creator: req.user._id
    }).then((result) => {
        res.send({result});
    }, (error) => {
        res.status(400).send(error);
    });
});

app.get('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.user.id
    }).then((result) => {
        if (!result) {
            return res.status(404).send();
        }
        res.send({result});
    }, (error) => {
        res.status(400).send();
    });
    
});

app.delete('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user.id
    }).then((result) => {
        if (!result) {
            return res.status(404).send();
        }
        res.send({result});
    }, (error) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;
    console.log('body', req.body)
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user.id
    }, {
        $set: body
    }, {
        new: true
    }).then((result) => {
        if (!result) {
            return res.status(404).send();
        }
        res.send({result});
    }).catch((err) => {
        res.status(400).send();
    });
});

app.get('/users', (req, res) => {
    res.render('index');
});

app.post('/users', (req, res) => {
    console.log('POST /users route');
    // console.log('req.body', req.body);
    // console.log('req.query', req.query);
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);

    user.save().then(() => {
        console.log('Saved user...');
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((error) => {
        console.log('Error saving user...');
        console.log(JSON.stringify(error, undefined, 2));
        res.status(400).send(error);
    });
})

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((error) => {
        res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(()=> {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});