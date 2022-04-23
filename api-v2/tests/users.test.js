const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

const { seedUser1, seedUser2 } = require("../_seedData/testData");

const jwt = require("jsonwebtoken");
const token = jwt.sign({ id: seedUser1._id }, process.env.SECRET_KEY, {
  expiresIn: "9999d",
});

const { userSchema } = require("./schemas");

// /users integration test
describe("Users API endpoint", () => {
  beforeAll(async () => {
    await User.create(seedUser1);
  });
  afterAll(async () => {
    await User.deleteOne({ _id: seedUser1._id });
    await User.deleteOne({ _id: seedUser2._id });
  });

  it("GET /users -> list of users", () => {
    return request(app)
      .get("/api/v1/users")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.arrayContaining([expect.objectContaining(userSchema)])
        );
      });
  });

  it("POST /users -> creates a user", () => {
    return request(app)
      .post("/api/v1/users")
      .send(seedUser2)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.data).toEqual(expect.objectContaining(userSchema));
      });
  });

  it("POST /users -> create user with no password", () => {
    return request(app)
      .post("/api/v1/users")
      .send({ name: "addf", email: "absd@yahoo.com" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: expect.any(String),
          })
        );
      });
  });

  it("POST /users -> create user with bad email", () => {
    return request(app)
      .post("/api/v1/users")
      .send({ ...seedUser1, email: "adaedaeded" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: expect.any(String),
          })
        );
      });
  });

  it("POST /users -> create duplicate user email", () => {
    return request(app)
      .post("/api/v1/users")
      .send({ ...seedUser2 })
      .expect("Content-Type", /json/)
      .expect(500)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: expect.any(String),
          })
        );
      });
  });

  it("GET /users/:id -> gets a user", () => {
    return request(app)
      .get(`/api/v1/users/${seedUser1._id}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(expect.objectContaining(userSchema));
      });
  });

  it("PUT /users/:id -> edits a user", () => {
    return request(app)
      .put(`/api/v1/users/${seedUser1._id}`)
      .set("Authorization", token)
      .send({ ...seedUser1, name: "abebu" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(expect.objectContaining(userSchema));
      });
  });

  it("DELETE /users/:id -> deletes a user", () => {
    return request(app)
      .delete(`/api/v1/users/${seedUser1._id}`)
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({
            acknowledged: expect.any(Boolean),
          })
        );
      });
  });
});
