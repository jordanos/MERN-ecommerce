const { expect, describe, beforeAll, afterAll, it } = global;
const request = require('supertest');
const app = require('../app');
const { connect, disconnect } = require('../config/db');

const {
  seedTransactionMethod1,
  seedTransactionMethod2,
} = require('../_seedData/testData');

const { transactionMethodSchema } = require('./schemas');
const TransactionMethod = require('../models/TransactionMethod');

describe('Products API endpoint', () => {
  beforeAll(async () => {
    await connect();
    await TransactionMethod.create(seedTransactionMethod1);
  });
  afterAll(async () => {
    await TransactionMethod.deleteOne({ _id: seedTransactionMethod1.id });
    await TransactionMethod.deleteOne({ _id: seedTransactionMethod2.id });
    await disconnect();
  });
  it('GET /transaction-methods -> list of transaction methods', () =>
    request(app)
      .get('/api/v1/transaction-methods')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.arrayContaining([
            expect.objectContaining(transactionMethodSchema),
          ])
        );
      }));

  it('POST /transaction-methods -> creates a transaction method', () =>
    request(app)
      .post('/api/v1/transaction-methods')
      .send(seedTransactionMethod2)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining(transactionMethodSchema)
        );
      }));

  it('GET /transaction-methods/:id -> gets a transaction method', () =>
    request(app)
      .get(`/api/v1/transaction-methods/${seedTransactionMethod1.id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining(transactionMethodSchema)
        );
      }));

  it('PUT /transaction-methods/:id -> edits a transaction method', () =>
    request(app)
      .put(`/api/v1/transaction-methods/${seedTransactionMethod1.id}`)
      .send({ name: 'iphone' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining(transactionMethodSchema)
        );
      }));

  it('DELETE /transaction-methods/:id -> deletes a transaction method', () =>
    request(app)
      .delete(`/api/v1/transaction-methods/${seedTransactionMethod1.id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({
            acknowledged: expect.any(Boolean),
          })
        );
      }));
});
