process.env.NODE_ENV = "test";
const { app } = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const knex = require("../db/connection");
console.log("/-/STARTING PUBS-TESTS/-/");
beforeAll(() => {
  return knex.seed.run();
});
afterAll(done => {
  knex.destroy();
  done();
});
describe("Testing the user_routes endpoint - /api/user_routes", () => {
  describe("/api/user_routes", () => {
    it("Returns with a status of 200", async done => {
      const response = await request.get("/api/user_routes");
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
