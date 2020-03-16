const express = require('express');
const cors = require('cors');

const app = express();
const c = require('./controller.js');

app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/users', c.createUser);

app.get('/getUserById/:userId', c.getUserById);

app.get('/getUserByName/:username', c.getUserByName);

app.get('/users', c.getAllUsers);

app.patch('/decrementFollowers/:username', c.decrementFollower);

app.patch('/incrementFollowers/:username', c.incrementFollower);

module.exports = app;
