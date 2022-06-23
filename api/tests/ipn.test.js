const { expect, describe, beforeAll, afterAll, it } = global;
const request = require('supertest');
const app = require('../app');
const { connect, disconnect } = require('../config/db');

const {
  seedTransactionMethod1,
  seedTransaction1,
  seedTransaction2,
  seedIpn1,
  seedIpn2,
} = require('../_seedData/testData');

const { ipnSchema } = require('./schemas');
const TransactionMethod = require('../models/TransactionMethod');
const Transaction = require('../models/Transaction');
const Ipn = require('../models/Ipn');

describe('Products API endpoint', () => {
  beforeAll(async () => {
    await connect();
    await TransactionMethod.create(seedTransactionMethod1);
    await Transaction.create(seedTransaction1);
    await Transaction.create(seedTransaction2);
    await Ipn.create(seedIpn1);
  });
  afterAll(async () => {
    await TransactionMethod.deleteOne({ _id: seedTransactionMethod1.id });
    await Transaction.deleteOne({ _id: seedTransaction1.id });
    await Transaction.deleteOne({ _id: seedTransaction2.id });
    await Ipn.deleteOne({ _id: seedIpn1.id });
    await Ipn.deleteOne({ _id: seedIpn2.id });
    await disconnect();
  });

  it('GET /ipn -> list of ipn requests', () =>
    request(app)
      .get('/api/v1/ipn')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.arrayContaining([expect.objectContaining(ipnSchema)])
        );
      }));

  // it('POST /ipn -> creates/accepts ipn request', () =>
  //   request(app)
  //     .post('/api/v1/ipn')
  //     .send(seedIpnYenepay)
  //     .expect('Content-Type', /json/)
  //     .expect(201));
  //       }));
});
