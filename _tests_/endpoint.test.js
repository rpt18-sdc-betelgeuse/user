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

    const response = await request.get('/getUserById/101');

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('JimHendrix');
    done();
  });
});

describe('Get /getUserByName', function () {
  test('Gets the getUserById endpoint', async done => {

    const response = await request.get('/getUserByName/JimHendrix');

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(101);
    done();
  });
});