const { expect, describe, beforeAll, afterAll, it } = global;
const request = require('supertest');
const app = require('../app');
const { connect, disconnect } = require('../config/db');
const Otp = require('../models/Otp');
const User = require('../models/User');

const { seedUser1 } = require('../_seedData/testData');

// /users integration test
describe('Users API endpoint', () => {
  beforeAll(async () => {
    await connect();
    await User.create(seedUser1);
  });
  afterAll(async () => {
    await User.deleteOne({ _id: seedUser1.id });
    await Otp.deleteOne({ owner: seedUser1.id });
    await disconnect();
  });

  it('POST /auth/login -> authenticates a user', () =>
    request(app)
      .post('/api/v1/auth/login')
      .send({ phone: seedUser1.phone, password: seedUser1.password })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({ token: expect.any(String) })
        );
      }));

  it('POST /auth/logout -> logs out a user and blacklists a token', () =>
    request(app)
      .post(`/api/v1/auth/logout/${seedUser1.id}`)
      .send()
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({ success: true })
        );
      }));

  it('POST /auth/sendotp -> send otp for a user', () =>
    request(app)
      .post(`/api/v1/auth/sendotp/${seedUser1.id}`)
      .send()
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({ success: true })
        );
      }));

  it('POST /auth/verify -> verify user', () =>
    request(app)
      .post(`/api/v1/auth/verify/${seedUser1.id}`)
      .send({ otp: 123456 })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({ success: true })
        );
      }));
});
