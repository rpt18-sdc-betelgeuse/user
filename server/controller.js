// const db = require('../database/mongo.js');
const redis = require('redis');
const models = require('../database/postgres/postgres.js');

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const client = redis.createClient({
  port: REDIS_PORT,
  host: REDIS_HOST,
});

const createUser = async (req, res) => {
  try {
    const user = await models.User.create(req.body);
    return res.status(201).json({ user });
  } catch (err) {
    res.status(500).send('could not create user');
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    // if in redis cache
    client.get(userId, async (err, reply) => {
      if (err) {
        res.status(404).send('Redis is unhappy!');
      }
      // console.log(reply.toString()); // Will print `OK`
      if (reply) {
        // stringify and res
        return res.status(200).send(JSON.parse(reply));
      }
      // get from postgres
      const user = await models.User.findOne({
        where: { id: userId },
      });
      if (user) {
        // add to redis cache
        client.set(userId, JSON.stringify(user));
        return res.status(200).json(user);
      }
      return res.status(404).send('User with the specified ID does not exists');
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getUserByName = (req, res) => {
  models.getUserByName(req.params.username, (err, results) => {
    if (err) {
      res.status(404).send('user not found');
    }
    res.send(results);
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await models.User.findAll({ plain: true });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// const updateUser = (req, res) => {
//   db.updateUser(req.params.id, req.body, (err) => {
//     if (err) {
//       res.status(500).send('could not update user');
//     }
//     res.status(200).send('user updated');
//   });
// };

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.User.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedUser = await models.User.findOne({ where: { id } });
      return res.status(200).json({ post: updatedUser });
    }
    throw new Error('User not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.User.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(204).send('User deleted');
    }
    throw new Error('User not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const decrementFollower = (req, res) => {
  models.decrementFollowers(req.params.username, (err) => {
    if (err) {
      res.status(404).send('decrementing followers failed');
    }
    res.sendStatus(200);
  });
};

const incrementFollower = (req, res) => {
  models.incrementFollowers(req.params.username, (err) => {
    if (err) {
      res.status(404).send('incrementing followers failed');
    }
    res.sendStatus(200);
  });
};

module.exports = {
  createUser,
  getUserById,
  getUserByName,
  getAllUsers,
  decrementFollower,
  incrementFollower,
  updateUser,
  deleteUser,
};
