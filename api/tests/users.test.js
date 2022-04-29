const { expect, describe, beforeAll, afterAll, it } = global;
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../models/User');
const Follow = require('../models/Follow');
const { connect, disconnect } = require('../config/db');

const {
  seedUser1,
  seedUser2,
  seedFollow1,
  seedFollow2,
} = require('../_seedData/testData');

const token1 = jwt.sign({ id: seedUser1._id }, process.env.SECRET_KEY, {
  expiresIn: '9999d',
});

const token2 = jwt.sign({ id: seedUser2._id }, process.env.SECRET_KEY, {
  expiresIn: '9999d',
});

const { userSchema, followSchema } = require('./schemas');

// /users integration test
describe('Users API endpoint', () => {
  beforeAll(async () => {
    await connect();
    await User.create(seedUser1);
    await Follow.create(seedFollow1);
  });
  afterAll(async () => {
    await Follow.deleteOne({ _id: seedFollow1.id });
    await Follow.deleteOne({ _id: seedFollow2.id });
    await User.deleteOne({ _id: seedUser1.id });
    await User.deleteOne({ _id: seedUser2.id });
    await disconnect();
  });

  it('GET /users -> list of users', () =>
    request(app)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.arrayContaining([expect.objectContaining(userSchema)])
        );
      }));

  it('POST /users -> creates a user', () =>
    request(app)
      .post('/api/v1/users')
      .send(seedUser2)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.data).toEqual(expect.objectContaining(userSchema));
      }));

  it('POST /users -> create user with no password', () =>
    request(app)
      .post('/api/v1/users')
      .send({ name: 'addf', phone: '251912344565' })
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: expect.any(String),
          })
        );
      }));

  it('POST /users -> create user with bad phone number', () =>
    request(app)
      .post('/api/v1/users')
      .send({ ...seedUser1, phone: '2823' })
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: expect.any(String),
          })
        );
      }));

  it('POST /users -> create duplicate user phone', () =>
    request(app)
      .post('/api/v1/users')
      .send({ ...seedUser2 })
      .expect('Content-Type', /json/)
      .expect(500)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: expect.any(String),
          })
        );
      }));

  it('GET /users/:id -> gets a user', () =>
    request(app)
      .get(`/api/v1/users/${seedUser1.id}`)
      .set('Authorization', token1)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(expect.objectContaining(userSchema));
      }));

  it('PUT /users/:id -> edits a user', () =>
    request(app)
      .put(`/api/v1/users/${seedUser1.id}`)
      .set('Authorization', token1)
      .send({ ...seedUser1, name: 'abebu' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(expect.objectContaining(userSchema));
      }));

  it('DELETE /users/:id -> deletes a user', () =>
    request(app)
      .delete(`/api/v1/users/${seedUser1.id}`)
      .set('Authorization', token1)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({
            acknowledged: expect.any(Boolean),
          })
        );
      }));

  // follows
  it('GET /follows -> list of follows', () =>
    request(app)
      .get('/api/v1/follows')
      .set('Authorization', token1)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.arrayContaining([expect.objectContaining(followSchema)])
        );
      }));

  it('POST /follows -> creates a follow', () =>
    request(app)
      .post('/api/v1/follows')
      .set('Authorization', token2)
      .send(seedFollow2)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining(followSchema)
        );
      }));

  it('POST /follows -> create a user with no auth', () =>
    request(app)
      .post('/api/v1/follows')
      .send({ followingId: seedFollow1.followingId })
      .expect('Content-Type', /json/)
      .expect(403)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: expect.any(String),
          })
        );
      }));

  it('POST /follows -> create duplicate follow', () =>
    request(app)
      .post('/api/v1/follows')
      .set('Authorization', token1)
      .send({
        followingId: seedFollow1.followingId,
      })
      .expect('Content-Type', /json/)
      .expect(500)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: expect.any(String),
          })
        );
      }));

  it('GET /follows/:id -> gets a follow', () =>
    request(app)
      .get(`/api/v1/follows/${seedFollow1.id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining(followSchema)
        );
      }));

  it('DELETE /follows/:id -> deletes a follow', () =>
    request(app)
      .delete(`/api/v1/follows/${seedFollow1.id}`)
      .set('Authorization', token2)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({
            acknowledged: expect.any(Boolean),
          })
        );
      }));

  it('GET /follows/followings/:id -> list of following users', () =>
    request(app)
      .get(`/api/v1/follows/followings/${seedFollow1.followingId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.arrayContaining([expect.objectContaining(userSchema)])
        );
      }));

  it('GET /follows/followers/:id -> list of follower users', () =>
    request(app)
      .get(`/api/v1/follows/followers/${seedFollow1.followingId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.arrayContaining([expect.objectContaining(userSchema)])
        );
      }));

  it('GET /follows/isfollowing/:followerId/:followingId -> checks if the users are following eachother', () =>
    request(app)
      .get(
        `/api/v1/follows/isfollowing/${seedFollow1.followerId}/${seedFollow1.followingId}`
      )
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({ isFollowing: expect.any(Boolean) })
        );
      }));
});
