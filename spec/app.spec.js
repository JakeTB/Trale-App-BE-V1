process.env.NODE_ENV = "test";
const { app } = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = chai;
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);
const knex = require("../db/connection");
beforeEach(() => {
  return knex.seed.run();
});
after(() => {
  return knex.destroy();
});
describe("API-Testing", () => {
  describe("/api", () => {
    describe("GET - /api", () => {
      describe("Status: 200", () => {
        it("Responds with a status of 200", () => {
          return request(app)
            .get("/api/")
            .expect(200);
        });
        it("Reponds with the correct JSON object", () => {
          return request(app)
            .get("/api/")
            .expect(200)
            .then(({ body: { message } }) => {
              expect(message).to.equal("Hello");
            });
        });
      });
      describe("Errors", () => {
        describe("Status: 404", () => {
          it("Responds with a status 0f 404", () => {
            return request(app)
              .get("/ap/")
              .expect(404);
          });
        });
      });
    });
    describe("/users", () => {
      describe("GET - /users", () => {
        describe("Status 200", () => {
          it("Responds with a status of 200", () => {
            return request(app)
              .get("/api/users")
              .expect(200);
          });
          it("Responds with the correct JSON object", () => {
            return request(app)
              .get("/api/users")
              .expect(200)
              .then(({ body: { users } }) => {
                expect(users[0].id).to.equal(1);
                expect(users[1].id).to.equal(2);
                expect(users[2].id).to.equal(3);
              });
          });
        });
      });
    });
  });
});
