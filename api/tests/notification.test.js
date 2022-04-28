const { expect, describe, beforeAll, afterAll, it } = global;
const request = require('supertest');
const app = require('../app');
const { connect, disconnect } = require('../config/db');
const Notification = require('../models/Notification');
const User = require('../models/User');

const { seedUser1, seedNotification } = require('../_seedData/testData');
const { notificationSchema } = require('./schemas');

// /users integration test
describe('Users API endpoint', () => {
  beforeAll(async () => {
    await connect();
    await User.create(seedUser1);
  });
  afterAll(async () => {
    await User.deleteOne({ _id: seedUser1.id });
    await Notification.deleteOne({ _id: seedNotification.id });
    await disconnect();
  });

  it('POST /notifications -> checks if notification sending works', () =>
    request(app)
      .post('/api/v1/notifications')
      .send({ ...seedNotification })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining(notificationSchema)
        );
      }));

  it('DELETE /notifications -> delete notification', () =>
    request(app)
      .delete(`/api/v1/notifications/${seedNotification.id}`)
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
