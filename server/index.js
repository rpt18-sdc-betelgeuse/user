const express = require('express');

const app = express();
// const port = 4000;
const db = require('../database/index.js');

app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/getUserById/:userId', (req, res) => {
  console.log('This is the req.params.userId: ', req.params.userId);
  db.getUserById(req.params.userId, (err, results) => {
    if (err) {
      console.log('this is the err from getUserById: ', err);
    }
    res.send(results);
  });
});

app.get('/getUserByName/:username', (req, res) => {
  console.log('This is the req.params.username: ', req.params.username);
  db.getUserByName(req.params.username, (err, results) => {
    if (err) {
      console.log('this is the err from getUserByName: ', err);
    }
    res.send(results);
  });
});

app.get('/users', (req, res) => {
  console.log('GET users has been activated');
  db.getAllUsers((err, results) => {
    if (err) {
      console.log('this is the err from getAllUsers: ', err);
    }
    res.send(results);
  });
});

app.patch('/decrementFollowers/:username', (req, res) => {
  console.log('This is the decrementFollowers PATCH req.params.username: ', req.params.username);
  db.decrementFollowers(req.params.username, (err) => {
    if (err) {
      console.log('this is the err from decrementFollowers: ', err);
    }
    res.sendStatus(200);
  });
});

app.patch('/incrementFollowers', (req, res) => {
  console.log('This is the incrementFollowers PATCH req.body: ', req.body);
  db.incrementFollowers(req.body.username, (err) => {
    if (err) {
      console.log('this is the err from incrementFollowers: ', err);
    }
    res.sendStatus(200);
  });
});

module.exports = app;

//app.listen(port, () => { console.log(`Server is running on ${port}`); });
