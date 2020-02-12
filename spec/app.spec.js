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
    describe("Testing endpoints for incorrect methods", () => {});
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
    describe("Get: /api/pubs - Errors", () => {
      describe("Status:404", () => {
        it("When passed an incorrect route returns with 404", () => {
          return request(app).get("/api/pins");
        });
      });
    });
  });
  describe("Get - /api/pubs/:id", () => {
    describe("Status:200", () => {
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
    });
    describe("Get /pubs/:id - Errors", () => {
      describe("Status:404", () => {
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
      });
      describe("Status: 400", () => {
        it("400 response for invalid id type (bad request)", () => {
          return request(app)
            .get("/api/pubs/not_a_valid_id")
            .expect(400);
        });
      });
    });
  });
  describe("Patch - /api/pubs/:id", () => {
    describe("Status: 201", () => {
      it("returns status 201 for successful patch", () => {
        const patchReq = { pub_name: "new_pub_name" };
        return request(app)
          .patch("/api/pubs/1")
          .send(patchReq)
          .expect(201);
      });
      it("pub name is successfully updated on patch request", () => {
        const patchReq = { pub_name: "new_pub_name" };
        return request(app)
          .patch("/api/pubs/1")
          .send(patchReq)
          .expect(201)
          .then(({ body: { updatedPub } }) => {
            expect(updatedPub.pub_name).to.equal("new_pub_name");
          });
      });
    });
  });
  describe("Post - /api/pubs/", () => {
    describe("Status: 201", () => {
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
  });
  describe("Get - /api/users", () => {
    describe("Status: 200", () => {
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
    describe("Get - /api/users - Errors", () => {
      describe("Status: 404", () => {
        it("404 response", () => {
          return request(app)
            .get("/api/NOT_USER_ENDPOINT")
            .expect(404)
            .then(({ body: { message } }) => {
              expect(message).to.equal("Route not found");
            });
        });
      });
    });
  });

  describe("Get - /api/users/:id", () => {
    describe("Status: 200", () => {
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
    describe("Get - /api/users/:id - Errors", () => {
      describe("Status: 404", () => {
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
      });
      describe("Status: 400", () => {
        it("400 response for invalid id type (bad request(app))", () => {
          return request(app)
            .get("/api/users/not_a_valid_id")
            .expect(400);
        });
      });
    });
  });
  describe("Patch - /api/users/:id", () => {
    describe("Status: 201", () => {
      it("returns status 201 for successful patch", () => {
        const postReq = { avatar: "new_avatar" };
        return request(app)
          .patch("/api/users/1")
          .send(postReq)
          .expect(201);
      });
      it("avatar is successfully updated on patch request(app)", () => {
        const postReq = { avatar: "new_avatar" };
        return request(app)
          .patch("/api/users/1")
          .send(postReq)
          .expect(201)
          .then(({ body: { updatedUser } }) => {
            expect(updatedUser.avatar).to.equal("new_avatar");
          });
      });
      it("Should be able to update the user bio if sent the correct body", () => {
        return request(app)
          .patch("/api/users/1")
          .send({ bio: "Hello" })
          .expect(201)
          .then(({ body: { updatedUser } }) => {
            expect(updatedUser.bio).to.equal("Hello");
          });
      });
    });
  });
  describe("Delete - /api/users/:id", () => {
    describe("Status: 204", () => {
      it("When sent a delete request to an existing user the server should respond with a status 204 signalling that the user was deleted", () => {
        return request(app)
          .del("/api/users/1")
          .expect(204);
      });
    });
  });
  describe("Post -  /api/users/", () => {
    describe("Status: 201", () => {
      it("201 status for post of user", () => {
        return request(app)
          .post("/api/users/")
          .send({ username: "tblack", avatar: "this_picture" })
          .expect(201);
      });
    });
    describe("Post - /api/users/ - Errors", () => {
      describe("Status: 404", () => {
        it("Returns with a status of 404 and a route not found emssage", () => {
          return request(app)
            .post("/api/ussers")
            .send({ username: "tblack", avatar: "this_picture" })
            .expect(404)
            .then(({ body: { message } }) => {
              expect(message).to.equal("Route not found");
            });
        });
      });
      describe("Status: 400", () => {
        it("When sent an empty post should respond with a status of 400", () => {
          return request(app)
            .post("/api/users")
            .send({})
            .expect(400)
            .then(({ body: { message } }) => {
              expect(message).to.equal("No username in request body");
            });
        });
        it("When trying to create a user with a username that is not unique", () => {
          return request(app)
            .post("/api/users")
            .send({ username: "Jake" })
            .expect(400)
            .then(({ body: { message } }) => {
              expect(message).to.equal("That value is not unique");
            });
        });
      });
    });
  });
  describe("Post - /api/user_routes", () => {
    describe("Status: 201", () => {
      it("The posted route appears in the database", () => {
        const newPost = {
          user_id: 2,
          routes_id: 1,
          route_name: "Trans-Pennine Trail"
        };
        return request(app)
          .post("/api/user_routes")
          .send(newPost)
          .expect(201)
          .then(({ body: { userRoute } }) => {
            expect(userRoute.progress).to.equal(0);
            expect(userRoute.id).to.equal(5);
            expect(userRoute.user_id).to.equal(2);
            expect(userRoute.routes_id).to.equal(1);
            expect(userRoute.route_name).to.equal("Trans-Pennine Trail");
          });
      });
    });
    describe("Post - /api/user_routes - Errors", () => {
      describe("Status: 404", () => {
        it("Returns with a 404 when sent a wrong url", () => {
          return request(app)
            .post("/api/users_routs")
            .send({ user_id: 2, routes_id: 1 })
            .expect(404);
        });
      });
      describe("Status: 400", () => {
        it("When sent an empty body returns with a status 400", () => {
          return request(app)
            .post("/api/user_routes")
            .send({})
            .expect(400)
            .then(({ body: { message } }) => {
              expect(message).to.equal("No request body");
            });
        });
        it("When sent a body without a user_id returns with a status 400", () => {
          return request(app)
            .post("/api/user_routes")
            .send({ routes_id: 1 })
            .expect(400)
            .then(({ body: { message } }) => {
              expect(message).to.equal("No user_id");
            });
        });
        it("When sent a body without a routes_id returns with a status 400", () => {
          return request(app)
            .post("/api/user_routes")
            .send({ user_id: 1 })
            .expect(400)
            .then(({ body: { message } }) => {
              expect(message).to.equal("No routes_id");
            });
        });
      });
    });
  });
  describe("Patch - /api/user_routes", () => {
    describe("Status: 201", () => {
      it("Updates the progress on the patched route", () => {
        return request(app)
          .put("/api/user_routes")
          .send({ user_id: 1, routes_id: 1, inc_progress: 1 })
          .expect(201)
          .then(({ body: { updatedUserRoutes } }) => {
            expect(updatedUserRoutes.progress).to.equal(2);
          });
      });
      it("It can change a route to completed", () => {
        return request(app)
          .put("/api/user_routes")
          .send({ user_id: 1, routes_id: 1, completed: true })
          .expect(201)
          .then(({ body: { updatedUserRoutes } }) => {
            expect(updatedUserRoutes.completed).to.equal(true);
          });
      });
    });
    describe("Patch - /api/user_routes - Errors", () => {
      describe("Status: 404", () => {
        it("When sent an incorrect url returns with a 404", () => {
          return request(app)
            .put("/api/users_routes")
            .send({ user_id: 1, routes_id: 1 })
            .expect(404);
        });
      });
      describe("Status: 400", () => {
        it("When sent an empty request body sends a error", () => {
          return request(app)
            .put("/api/user_routes")
            .send({})
            .expect(400)
            .then(({ body: { message } }) => {
              expect(message).to.equal("Empty request body");
            });
        });
        it("When sent an request body without user_id returns with a 400", () => {
          return request(app)
            .put("/api/user_routes")
            .send({ routes_id: 1 })
            .expect(400)
            .then(({ body: { message } }) => {
              expect(message).to.equal("No user_id on request body");
            });
        });
        it("When sent an request body without routes_id returns with a 400", () => {
          return request(app)
            .put("/api/user_routes")
            .send({ user_id: 1 })
            .expect(400)
            .then(({ body: { message } }) => {
              expect(message).to.equal("No routes_id on request body");
            });
        });
        it("When sent a patch request with an invalid user_id returns with a 400", () => {
          return request(app)
            .put("/api/user_routes")
            .send({ user_id: "apple", routes_id: 1 })
            .expect(400);
        });
        it("When sent a patch request with an invalid route_id returns with a 400", () => {
          return request(app)
            .put("/api/user_routes")
            .send({ user_id: 1, routes_id: "apple" })
            .expect(400);
        });
      });
    });
  });
  describe("Get - /api/user_routes/:user_id", () => {
    describe("Status: 200", () => {
      it("Responds with a status of 200", () => {
        return request(app)
          .get("/api/user_routes/1")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
          });
      });
    });
    describe("Get - /api/user_routes/:user_id - Errors", () => {
      describe("Status: 404", () => {
        it("When sent an incorrect route responds with 404", () => {
          return request(app)
            .get("/api/user_rout/1")
            .expect(404);
        });
      });
      describe("Status: 400", () => {
        it("When passed an incorrect id type responds with a 400", () => {
          return request(app)
            .get("/api/user_routes/apple")
            .expect(400);
        });
        it("When passed a valid id that does not exist reponds with a status 400", () => {
          return request(app)
            .get("/api/user_routes/9999")
            .expect(400)
            .then(({ body: { message } }) => {
              expect(message).to.equal("No value for that id");
            });
        });
      });
    });
  });
});
