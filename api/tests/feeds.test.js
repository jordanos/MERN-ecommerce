const { expect, describe, beforeAll, afterAll, it } = global;
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Feed = require('../models/Feed');

const { seedUser1, seedFeed1 } = require('../_seedData/testData');

const { feedSchema } = require('./schemas');

// /users integration test
describe('Users API endpoint', () => {
  beforeAll(async () => {
    await User.create(seedUser1);
    await Feed.create(seedFeed1);
  });
  afterAll(async () => {
    await User.deleteOne({ _id: seedUser1.id });
    await Feed.deleteOne({ _id: seedFeed1.id });
  });

  it('GET /feeds -> list of feeds', () =>
    request(app)
      .get('/api/v1/feeds')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.arrayContaining([expect.objectContaining(feedSchema)])
        );
      }));
});
