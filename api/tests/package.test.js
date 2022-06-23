const { expect, describe, beforeAll, afterAll, it } = global;
const request = require('supertest');
const app = require('../app');
const { connect, disconnect } = require('../config/db');
const Package = require('../models/Package');

const { seedPackage1, seedPackage2 } = require('../_seedData/testData');
const { packageSchema } = require('./schemas');

// packages integration test
describe('Packages API endpoint', () => {
  beforeAll(async () => {
    await connect();
    await Package.create(seedPackage1);
  });
  afterAll(async () => {
    await Package.deleteOne({ _id: seedPackage1.id });
    await Package.deleteOne({ _id: seedPackage2.id });
    await disconnect();
  });

  it('GET /packages -> gets all packages of a user', () =>
    request(app)
      .get('/api/v1/packages')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.arrayContaining([expect.objectContaining(packageSchema)])
        );
      }));

  it('POST /packages -> creates a package', () =>
    request(app)
      .post('/api/v1/packages')
      .send({ ...seedPackage2 })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining(packageSchema)
        );
      }));

  it('GET /packages -> get a single package', () =>
    request(app)
      .get(`/api/v1/packages/${seedPackage1.id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining(packageSchema)
        );
      }));

  it('DELETE /packages -> delete apckage', () =>
    request(app)
      .delete(`/api/v1/packages/${seedPackage2.id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({
            acknowledged: true,
            deletedCount: 1,
          })
        );
      }));
});
