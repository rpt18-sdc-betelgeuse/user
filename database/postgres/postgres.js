const Sequelize = require('sequelize');
const dotenv = require('dotenv');

// setting up the dotenv config
dotenv.config({
  path: './.env',
});

const sequelize = new Sequelize('sdcuser', 'postgres', process.env.DB_PASS, {
  host: process.env.DB_HOST || 'localhost',
  port: '5432',
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// ORM table mapping
const User = sequelize.define('users', {
  handle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  track_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  follower_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  join_date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
}, {
  timestamps: false,
});

sequelize.sync();
module.exports.User = User;

// Create a new user
// const createUser = (userObj, callback) => {
//   // console.log("cheeeese", userObj);
//   //const newUser = new User(userObj);
//   sequelize.sync({ force: true })
//     .then( () => {
//       User.create(userObj)
//     })
//     .then(savedUser => {
//       callback(savedUser);
//       console.log("Users auto-generated ID:", savedUser.id);
//     })
//     .catch( (err) => {
//       console.log('error', err)
//     });
// }

// const createUser = (userObj, callback) => {
//   const newUser = new User(userObj);
//   newUser.save(newUser)
//     .then((data) => {
//       callback(data);
//     })
//     .catch((error) => {
//       callback(null, error);
//     });
// };

// const getUserById = (ID, callback) => {
//   User.findOne({ id: ID }).exec(callback);
// };

// const getUserByName = (username, callback) => {
//   User.findOne({ name: username }).exec(callback);
// };

// const getAllUsers = (callback) => {
//   User.find({}).exec(callback);
// };

// const decrementFollowers = (username, callback) => {
//   User.findOneAndUpdate({ name: username }, { $inc: { follower_count: -1 } }).exec(callback);
// };

// const incrementFollowers = (username, callback) => {
//   User.findOneAndUpdate({ name: username }, { $inc: { follower_count: 1 } }).exec(callback);
// };

// const updateUser = (id, data, callback) => {
//   User.findByIdAndUpdate(id, data).exec(callback);
// };

// const deleteUser = (query, callback) => {
//   User.findOneAndDelete(query).exec(callback);
// };

// module.exports.createUser = createUser;
// module.exports.getUserById = getUserById;
// module.exports.decrementFollowers = decrementFollowers;
// module.exports.incrementFollowers = incrementFollowers;
// module.exports.getAllUsers = getAllUsers;
// module.exports.getUserByName = getUserByName;
// module.exports.User = User;
// module.exports.deleteUser = deleteUser;
// module.exports.updateUser = updateUser;

// module.exports.createUser = createUser;
