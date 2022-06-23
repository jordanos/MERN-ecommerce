const { expect, describe, beforeAll, afterAll, it } = global;
const request = require('supertest');
const app = require('../app');
const { connect, disconnect } = require('../config/db');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

const {
  seedUser1,
  seedUser2,
  seedConversation,
  seedMessage,
  token1,
} = require('../_seedData/testData');
const { messageSchema, messageSchemaPost } = require('./schemas');

// /users integration test
describe('Users API endpoint', () => {
  beforeAll(async () => {
    await connect();
    await User.create(seedUser1);
    await User.create(seedUser2);
    await Conversation.create(seedConversation);
  });
  afterAll(async () => {
    await User.deleteOne({ _id: seedUser1.id });
    await User.deleteOne({ _id: seedUser2.id });
    await Message.deleteOne({ _id: seedMessage.id });
    await Conversation.deleteOne({ _id: seedConversation.id });
    await disconnect();
  });

  it('GET /messages -> gets all messages of a user', () =>
    request(app)
      .get('/api/v1/messages')
      .set('Authorization', token1)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.arrayContaining([expect.objectContaining(messageSchema)])
        );
      }));

  it('POST /messages -> checks if message creation/sending works', () =>
    request(app)
      .post('/api/v1/messages')
      .set('Authorization', token1)
      .send({ ...seedMessage })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining(messageSchemaPost)
        );
      }));

  it('DELETE /messages -> delete message', () =>
    request(app)
      .delete(`/api/v1/messages/${seedMessage.id}`)
      .set('Authorization', token1)
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
