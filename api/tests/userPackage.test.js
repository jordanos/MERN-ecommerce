const { expect, describe, beforeAll, afterAll, it } = global;
const request = require('supertest');
const app = require('../app');
const { connect, disconnect } = require('../config/db');
const Package = require('../models/Package');
const User = require('../models/User');
const UserPackage = require('../models/UserPackage');

const {
  seedPackage1,
  seedPackage2,
  seedUser1,
  seedUserPackage1,
  seedUserPackage2,
  token1,
} = require('../_seedData/testData');
const { userPackageSchema, userPackageSchemaPost } = require('./schemas');

// users packages integration test
describe('Users packages API endpoint', () => {
  beforeAll(async () => {
    await connect();
    await User.create(seedUser1);
    await Package.create(seedPackage1);
    await Package.create(seedPackage2);
    await UserPackage.create(seedUserPackage1);
  });
  afterAll(async () => {
    await UserPackage.deleteOne({ _id: seedUserPackage1.id });
    await UserPackage.deleteOne({ _id: seedUserPackage2.id });
    await Package.deleteOne({ _id: seedPackage1.id });
    await Package.deleteOne({ _id: seedPackage2.id });
    await User.deleteOne({ _id: seedUser1.id });
    await disconnect();
  });

  it('GET /user-packages -> gets all packages of a user', () =>
    request(app)
      .get('/api/v1/user-packages')
      .set('Authorization', token1)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.arrayContaining([expect.objectContaining(userPackageSchema)])
        );
      }));

  it('POST /user-packages -> creates a package for a user', () =>
    request(app)
      .post('/api/v1/user-packages')
      .set('Authorization', token1)
      .send({ ...seedUserPackage2 })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining(userPackageSchemaPost)
        );
      }));

  it('GET /user-packages -> get a single package of a user', () =>
    request(app)
      .get(`/api/v1/user-packages/${seedUserPackage1.id}`)
      .set('Authorization', token1)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining(userPackageSchema)
        );
      }));
});
