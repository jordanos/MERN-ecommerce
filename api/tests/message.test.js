const { expect, describe, beforeAll, afterAll, it } = global;
const request = require('supertest');
const app = require('../app');
const { connect, disconnect } = require('../config/db');
const Message = require('../models/Message');
const User = require('../models/User');

const { seedUser1, seedUser2, seedMessage } = require('../_seedData/testData');
const { messageSchema } = require('./schemas');

// /users integration test
describe('Users API endpoint', () => {
  beforeAll(async () => {
    await connect();
    await User.create(seedUser1);
    await User.create(seedUser2);
  });
  afterAll(async () => {
    await User.deleteOne({ _id: seedUser1.id });
    await User.deleteOne({ _id: seedUser2.id });
    await Message.deleteOne({ _id: seedMessage.id });
    await disconnect();
  });

  it('POST /messages -> checks if message sending works', () =>
    request(app)
      .post('/api/v1/messages')
      .send({ ...seedMessage })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining(messageSchema)
        );
      }));

  it('DELETE /messages -> delete message', () =>
    request(app)
      .delete(`/api/v1/messages/${seedMessage.id}`)
      .send()
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
