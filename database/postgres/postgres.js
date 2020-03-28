const Sequelize = require('sequelize');

const sequelize = new Sequelize('sdcuser', 'cheeseuser', 'qwerty', {
  host: 'localhost',
  dialect: 'postgres',
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

// const id = i;
// const handle = faker.name.findName();
// const name = faker.name.findName();
// const image_url = `http://d2tlnaqrf4t9d7.cloudfront.net/UserId+photos+for+S3/userId${i}.jpeg`;
// const track_count = faker.random.number(50);
// const follower_count = faker.random.number(2000);
// const join_date = faker.date.past(10, '2020-01-01');
// const user = {
//   id, handle, name, image_url, track_count, follower_count, join_date,
// };

// ORM table mapping
const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
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
    type: Sequelize.INTEGER, // will implement bcrypt or something similar later
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
});

sequelize.sync();

module.exports = User;
