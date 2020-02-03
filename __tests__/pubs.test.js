process.env.NODE_ENV = "test";
const { app } = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const knex = require("../db/connection");

describe("Testing the pubs endpoint - /api/pubs/", () => {
  describe("/api/pubs", () => {
    describe("GET - /api/pubs", () => {
      it("Returns with a status of 200", async done => {
        const response = await request.get("/api/pubs");
        expect(response.statusCode).toBe(200);
        done();
      });
      it("Returns the correct JSOn object", async done => {
        const response = await request.get("/api/pubs");
        const {
          body: { pubs }
        } = response;
        expect(pubs[0].id).toBe(1);
        expect(pubs[3].id).toBe(4);
        done();
      });
    });
  });
});
