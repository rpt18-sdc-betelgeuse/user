const faker = require('faker');
const db = require('./index');

const users = [];

for (let i = 1; i < 101; i++) {
  const id = i;
  const handle = faker.name.findName();
  const name = faker.name.findName();
  const image_url = `http://d2tlnaqrf4t9d7.cloudfront.net/UserId+photos+for+S3/userId${i}.jpeg`;
  const track_count = faker.random.number(50);
  const follower_count = faker.random.number(2000);
  const join_date = faker.date.past(10, '2020-01-01');
  const user = {
    id, handle, name, image_url, track_count, follower_count, join_date,
  };
  console.log(user);
  users.push(user);
}

db.User.insertMany(users);
