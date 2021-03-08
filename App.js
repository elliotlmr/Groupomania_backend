//Packages
const express = require ('express');
const bodyParser = require('body-parser');
const path = require('path');

//Routers
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');

const db = require("./models");
db.sequelize.sync();


//db.users.findAll().then(result => console.log('result', result));
//db.posts.findAll().then(result => console.log('result', result));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/medias', express.static(path.join(__dirname, 'medias')));

app.use('/api/auth', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/posts', commentsRoutes);

module.exports = app;