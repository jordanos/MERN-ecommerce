const { expect, describe, beforeAll, afterAll, it } = global;
const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
const { connect, disconnect } = require('../config/db');

const {
  seedProduct1,
  seedUser1,
  token1,
  seedProduct2,
} = require('../_seedData/testData');

const { productSchema, productSchemaPost } = require('./schemas');
const User = require('../models/User');

describe('Products API endpoint', () => {
  beforeAll(async () => {
    await connect();
    await User.create(seedUser1);
    await Product.create(seedProduct1);
  });
  afterAll(async () => {
    await Product.deleteOne({ _id: seedProduct1.id });
    await Product.deleteOne({ _id: seedProduct2.id });
    await User.deleteOne({ _id: seedUser1.id });
    await disconnect();
  });
  it('GET /products -> list of products', () =>
    request(app)
      .get('/api/v1/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.arrayContaining([expect.objectContaining(productSchema)])
        );
      }));

  it('POST /products -> creates a product', () =>
    request(app)
      .post('/api/v1/products')
      .set('Authorization', token1)
      .send(seedProduct2)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining(productSchemaPost)
        );
      }));

  it('GET /products/:id -> gets a product', () =>
    request(app)
      .get(`/api/v1/products/${seedProduct1.id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining(productSchema)
        );
      }));

  it('PUT /products/:id -> edits a product', () =>
    request(app)
      .put(`/api/v1/products/${seedProduct1.id}`)
      .set('Authorization', token1)
      .send({ ...seedProduct1, name: 'iphone' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining(productSchemaPost)
        );
      }));

  it('DELETE /products/:id -> deletes a product', () =>
    request(app)
      .delete(`/api/v1/products/${seedProduct2.id}`)
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
});
