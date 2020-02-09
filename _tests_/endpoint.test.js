const app = require('../server/index.js');
const supertest = require('supertest');
const request = supertest(app);

// beforeAll(done => {
//   done();
// });

// afterAll(done => {
//   // Closing the DB connection allows Jest to exit successfully.
//   mongoose.connection.close();
//   done();
// });

describe('Get /getUserByID', function () {
  test('Gets the getUserById endpoint', async done => {

    const response = await request.get('/getUserById/1');

    expect(response.status).toBe(200);
    expect(response.body.image_url).toBe("http://d2tlnaqrf4t9d7.cloudfront.net/UserId+photos+for+S3/userId1.jpeg");
    done();
  });
});
