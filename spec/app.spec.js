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
        describe("Status: 200", () => {
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
        describe("Errors", () => {
          describe("Status: 404", () => {
            it("When sent an incorrect route responds with 404", () => {
              return request(app)
                .get("/api/usrs/")
                .expect(404);
            });
          });
        });
      });
    });
    describe("/users/:id", () => {
      describe("GET - /users/:id", () => {
        describe("Status: 200", () => {
          it("Responds with a status 200", () => {
            return request(app)
              .get("/api/users/1")
              .expect(200);
          });
          it("Responds with the correct user", () => {
            return request(app)
              .get("/api/users/1")
              .expect(200)
              .then(({ body: { user } }) => {
                expect(user.username).to.equal("Adam");
              });
          });
        });
        describe("Errors", () => {
          describe("Status: 404", () => {
            it("Responds with 404 when sent an incorrect route", () => {
              return request(app)
                .get("/api/usr/1")
                .expect(404);
            });
            it("When sent a valid id, for a non existant entry", () => {
              return request(app)
                .get("/api/users/600")
                .expect(404);
            });
            it("The error message returned is correct", () => {
              return request(app)
                .get("/api/users/900")
                .expect(404)
                .then(({ body: { message } }) => {
                  expect(message).to.equal("That id does not exist");
                });
            });

            describe("Status: 400", () => {
              it("When sent an invalid id, responds with a 400", () => {
                return request(app)
                  .get("/api/users/apple")
                  .expect(400);
              });
            });
          });
        });
      });
      describe.only("PATCH - /users/:id", () => {
        describe("Status: 200", () => {
          it("Responds with a status of 200", () => {
            return request(app)
              .patch("/api/users/1")
              .expect(200)
              .send({ avatar: "Test123" });
          });
          it("Updates the avatar of the selected user", () => {
            return request(app)
              .patch("/api/users/1")
              .expect(200)
              .send({ avatar: "Test123" })
              .then(({ body: { updatedUser } }) => {
                expect(updatedUser.avatar).to.equal("Test123");
              });
          });
        });
      });
    });
  });
});
