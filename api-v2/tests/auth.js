const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const { seedUser1 } = require("../_seedData/testData");

// /users integration test
describe("Auth API endpoint", () => {
  beforeAll(async () => {
    await User.create(seedUser1);
  });
  afterAll(async () => {
    await User.deleteOne({ _id: seedUser1._id });
  });

  it("POST /auth/login -> authenticates a user", () => {
    return request(app)
      .post("/api/v1/auth/login")
      .send({ email: seedUser1.email, password: seedUser1.password })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({ token: expect.any(String) })
        );
      });
  });
});
