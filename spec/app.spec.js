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

describe("API-TESTING", () => {
  describe("GET: /api", () => {
    describe("Status:200", () => {
      it("Returns with a status of 200", () => {
        return request(app)
          .get("/api")
          .expect(200);
      });
    });
  });
  describe("API-errors:", () => {
    describe("Status: 404", () => {
      it("Recieves a status of 404", () => {
        return request(app)
          .get("/api/tpics")
          .expect(404);
      });
      it("Recieves an error message", () => {
        return request(app)
          .get("/api/tpics")
          .expect(404)
          .then(({ body }) => {
            expect(body.message).to.equal("Route not found");
          });
      });
    });
  });
  describe("Get: /api/pubs", () => {
    describe("Status:200", () => {
      it("Returns with a status of 200", () => {
        return request(app)
          .get("/api/pubs")
          .expect(200);
      });
      it("Returns with the correct JSON object", () => {
        return request(app)
          .get("/api/pubs")
          .expect(200)
          .then(({ body: { pubs } }) => {
            expect(pubs[0].id).to.equal(1);
            expect(pubs[3].id).to.equal(4);
          });
      });
    });
  });
  describe("Get - /api/pubs/:id", () => {
    it("200 respsonse", () => {
      return request(app)
        .get("/api/pubs/1")
        .expect(200);
    });
    it("responds with appropriate pub data", () => {
      return request(app)
        .get("/api/pubs/2")
        .expect(200)
        .then(({ body: { pub } }) => {
          expect(pub.pub_name).to.equal("The Three Horseshoes");
        });
    });
    describe("GET /pubs/:id ERRORS", () => {
      it("404 for valid, but non existent user ID", () => {
        return request(app)
          .get("/api/pubs/9999")
          .expect(404);
      });
      it("404 returns appropriate error message", () => {
        return request(app)
          .get("/api/pubs/999")
          .expect(404)
          .then(({ body: { message } }) => {
            expect(message).to.equal("That id does not exist");
          });
      });
      it("400 response for invalid id type (bad request)", () => {
        return request(app)
          .get("/api/pubs/not_a_valid_id")
          .expect(400);
      });
    });
  });
  describe("Patch - pubs/:id", () => {
    it("returns status 200 for successful patch", () => {
      const patchReq = { pub_name: "new_pub_name" };
      return request(app)
        .patch("/api/pubs/1")
        .send(patchReq)
        .expect(200);
    });
    it("pub name is successfully updated on patch request", () => {
      const patchReq = { pub_name: "new_pub_name" };
      return request(app)
        .patch("/api/pubs/1")
        .send(patchReq)
        .expect(200)
        .then(({ body: { updatedPub } }) => {
          expect(updatedPub.pub_name).to.equal("new_pub_name");
        });
    });
  });
  describe("Post - pubs/:id", () => {
    it("201 status for post of user", () => {
      return request(app)
        .post("/api/pubs/")
        .send({
          pub_name: "Rock Inn",
          pub_address: "458 Leeds and Bradford Road, LS13 1EP",
          lat: 53.8185063,
          lng: -1.6368455,
          description: "this is a pub"
        })
        .then(({ status }) => {
          expect(status).to.equal(201);
        });
    });
  });
  describe("GET /users", () => {
    it("200 response", () => {
      return request(app)
        .get("/api/users")
        .expect(200);
    });
    it("responds with correct JSON data", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users[0].id).to.equal(1);
          expect(users[1].id).to.equal(2);
        });
    });
  });
  describe("ERRORS /users", () => {
    it("404 response", () => {
      return request(app)
        .get("/api/NOT_USER_ENDPOINT")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).to.equal("Route not found");
        });
    });
  });
  describe("/users/:id", () => {
    describe("GET /users/:id", () => {
      it("200 respsonse", () => {
        return request(app)
          .get("/api/users/1")
          .expect(200);
      });
      it("responds with appropriate user data", () => {
        return request(app)
          .get("/api/users/1")
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user.username).to.equal("Adam");
          });
      });
    });
    describe("Errors /users/:id", () => {
      it("404 for valid, but non existent user ID", () => {
        return request(app)
          .get("/api/users/9999")
          .expect(404);
      });
      it("404 returns appropriate error message", () => {
        return request(app)
          .get("/api/users/999")
          .expect(404)
          .then(({ body: { message } }) => {
            expect(message).to.equal("That id does not exist");
          });
      });
      it("400 response for invalid id type (bad request(app))", () => {
        return request(app)
          .get("/api/users/not_a_valid_id")
          .expect(400);
      });
    });
    describe("METHOD: PATCH users/:id", () => {
      it("returns status 200 for successful patch", () => {
        const postReq = { avatar: "new_avatar" };
        return request(app)
          .patch("/api/users/1")
          .send(postReq)
          .expect(200);
      });
      it("avatar is successfully updated on patch request(app)", () => {
        const postReq = { avatar: "new_avatar" };
        return request(app)
          .patch("/api/users/1")
          .send(postReq)
          .expect(200)
          .then(({ body: { updatedUser } }) => {
            expect(updatedUser.avatar).to.equal("new_avatar");
          });
      });
    });
    describe("METHOD: POST users/:id", () => {
      it("201 status for post of user", () => {
        return request(app)
          .post("/api/users/")
          .send({ username: "tblack", avatar: "this_picture" })
          .expect(201);
      });
    });
  });
  describe("POST - /api/user_routes", () => {
    describe("Status: 201", () => {
      it("The posted route appears in the database", () => {
        const newPost = { user_id: 2, routes_id: 1 };
        return request(app)
          .post("/api/user_routes")
          .send(newPost)
          .expect(201)
          .then(({ body: { userRoute } }) => {
            expect(userRoute.progress).to.equal(0);
            expect(userRoute.id).to.equal(6);
            expect(userRoute.user_id).to.equal(2);
            expect(userRoute.routes_id).to.equal(1);
          });
      });
    });
    describe("POST - /api/user_routes Errors", () => {
      describe("Status: 404", () => {
        it("Returns with a 404 when sent a wrong url", () => {
          return request(app)
            .post("/api/users_routs")
            .send({ user_id: 2, routes_id: 1, progress: 0 })
            .expect(404);
        });
      });
    });
    describe.only("PATCH - /api/users_routes", () => {
      describe("Status: 201", () => {
        it("Updates the progress on the patched route", () => {
          return request(app)
            .patch("/api/user_routes")
            .send({ user_id: 1, routes_id: 1 })
            .expect(201)
            .then(({ body: { updatedUserRoutes } }) => {
              expect(updatedUserRoutes.progress).to.equal(2);
            });
        });
      });
    });
  });
});
