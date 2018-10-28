const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    const config = require('./config.json');
    process.env.PORT = config.development.PORT;
    process.env.MONGODB_URI = config.development.MONGODB_URI;
}

// if (env === 'development') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI= 'mongodb://localhost:27017/TodoApp'
// }