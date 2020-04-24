const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');
// const User = require('./postgres.js');

const lines = argv.lines || 1000000;
const filename = argv.output || 'users.csv';
const stream = fs.createWriteStream(filename);

function randomBetween(min, max) {
  return Math.floor(min + Math.random() * max);
}

const createUser = (i) => {
  const photoNum = randomBetween(1, 1000);
  const handle = faker.name.findName();
  const name = faker.name.findName();
  const image_url = `d2sx1418v3pj88.cloudfront.net/img/userId${photoNum}.jpeg`;
  const track_count = faker.random.number(50);
  const follower_count = faker.random.number(2000);
  // const join_date = faker.date.between('2019-01-01', '2021-01-05');
  const join_date = '2019-01-01';
  return `${handle},${name},${image_url},${track_count},${follower_count},${join_date}\n`;
};

const startWriting = (writeStream, encoding, done) => {
  // eslint-disable-next-line no-var
  var i = lines;
  function writing() {
    const canWrite = true;
    do {
      i--;
      const user = createUser(i);
      // check if i === 0 so we would write and call `done`
      if (i === 0) {
        // we are done so fire callback
        writeStream.write(user, encoding, done);
      } else {
        // we are not done so don't fire callback
        writeStream.write(user, encoding);
      }
      // else call write and continue looping
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      // our buffer for stream filled and need to wait for drain
      // Write some more once it drains.
      writeStream.once('drain', writing);
    }
  }
  writing();
};

// write our `header` line before we invoke the loop
stream.write('handle,name,image_url,track_count,follower_count,join_date\n', 'utf-8');
// invoke startWriting and pass callback
startWriting(stream, 'utf-8', () => {
  stream.end();
});
