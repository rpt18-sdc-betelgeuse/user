const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/soundcloud', {
  useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false,
});

const userSchema = mongoose.Schema({
  id: Number,
  handle: String,
  name: String,
  image_url: String,
  track_count: Number,
  follower_count: Number,
  join_date: Date,
});

const User = mongoose.model('User', userSchema);

const getUserById = (ID, callback) => {
  User.findOne({ id: ID }).exec(callback);
};

const getUserByName = (username, callback) => {
  User.findOne({ name: username }).exec(callback);
};

const getAllUsers = (callback) => {
  User.find({}).exec(callback);
};

const decrementFollowers = (username, callback) => {
  User.findOneAndUpdate({ name: username }, { $inc: { follower_count: -1 } }).exec(callback);
};

const incrementFollowers = (username, callback) => {
  User.findOneAndUpdate({ name: username }, { $inc: { follower_count: 1 } }).exec(callback);
};

module.exports.getUserById = getUserById;
module.exports.decrementFollowers = decrementFollowers;
module.exports.incrementFollowers = incrementFollowers;
module.exports.getAllUsers = getAllUsers;
module.exports.getUserByName = getUserByName;
module.exports.User = User;
