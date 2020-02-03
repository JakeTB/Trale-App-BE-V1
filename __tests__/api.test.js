process.env.NODE_ENV = "test";
const { app } = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const knex = require("../db/connection");
beforeAll(() => {
  return knex.seed.run();
});
afterAll(() => {
  return knex.destroy();
});
describe("Testing the API - /api/", () => {
  describe.only("Status: 200", () => {
    it("Responds with a status of 200", async done => {
      const response = await request.get("/api/");
      expect(response.status).toBe(200);
      done();
    });
    it("Reponds with the correct JSON object", async done => {
      const response = await request.get("/api/");
      console.log("Response", response);
      done();
    });
    // describe("Errors", () => {
    //   describe("Status: 404", () => {
    //     it("Responds with a status 0f 404", () => {
    //       return request(app)
    //         .get("/ap/")
    //         .expect(404);
    //     });
    //   });
    // });
  });
});
