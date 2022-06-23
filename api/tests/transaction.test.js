const { expect, describe, beforeAll, afterAll, it } = global;
const request = require('supertest');
const app = require('../app');
const { connect, disconnect } = require('../config/db');
const Transaction = require('../models/Transaction');
const TransactionMethod = require('../models/TransactionMethod');
const User = require('../models/User');

const {
  seedUser1,
  seedTransactionMethod1,
  seedTransaction1,
} = require('../_seedData/testData');
const { transactionSchema } = require('./schemas');

// transaction integration test
describe('Transaction API endpoint', () => {
  beforeAll(async () => {
    await connect();
    await User.create(seedUser1);
    await TransactionMethod.create(seedTransactionMethod1);
    await Transaction.create(seedTransaction1);
  });
  afterAll(async () => {
    await User.deleteOne({ _id: seedUser1.id });
    await Transaction.deleteOne({ _id: seedTransaction1.id });
    await Transaction.deleteOne({ _id: seedTransaction1.id });
    await TransactionMethod.deleteOne({ _id: seedTransactionMethod1.id });
    await disconnect();
  });

  it('GET /transactions -> gets all transactions', () =>
    request(app)
      .get('/api/v1/transactions')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.arrayContaining([expect.objectContaining(transactionSchema)])
        );
      }));
  it('GET /transactions -> gets a specified transaction', () =>
    request(app)
      .get(`/api/v1/transactions/${seedTransaction1.id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining(transactionSchema)
        );
      }));
});
