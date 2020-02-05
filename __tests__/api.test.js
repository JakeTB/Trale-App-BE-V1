process.env.NODE_ENV = "test";
const { app } = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const knex = require("../db/connection");
console.log("/-/STARTING API-TESTS/-/");

// afterAll(done => {
//   return knex.destroy().then(() => {
//     return knex.seed.run().then(() => {
//       done();
//     });
//   });
// });
describe("Testing the API - /api/", () => {
  describe("Status: 200", () => {
    it("Responds with a status of 200", async done => {
      const response = await request.get("/api/");
      expect(response.status).toBe(200);
      done();
    });

    describe("/api ERRORS", () => {
      it("Responds with 404 on non existent path", async done => {
        const res = await request.get("/no_ta_path");
        expect(res.status).toBe(404);
        done();
      });
    });
  });
});
