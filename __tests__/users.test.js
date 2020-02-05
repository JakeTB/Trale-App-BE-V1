process.env.NODE_ENV = "test";
const { app } = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const knex = require("../db/connection");
console.log("/-/STARTING USERS-TESTS/-/");

// afterAll(done => {
//   return knex.destroy().then(() => {
//     return knex.seed.run().then(() => {
//       done();
//     });
//   });
// });

describe("Endpoint: /users", () => {
  describe("GET /users", () => {
    it("200 response", async done => {
      const res = await request.get("/api/users");
      expect(res.status).toBe(200);
      done();
    });
    it("responds with correct JSON data", async done => {
      const res = await request.get("/api/users");
      const {
        body: { users }
      } = res;
      expect(users[0].id).toBe(1);
      expect(users[1].id).toBe(2);
      done();
    });
  });
  describe("ERRORS /users", () => {
    it("404 response", async done => {
      const res = await request.get("/api/NOT_USER_ENDPOINT");
      const {
        body: { message },
        status
      } = res;
      expect(status).toBe(404);
      expect(message).toBe("Route not found");
      done();
    });
  });
  describe("/users/:id", () => {
    describe("GET /users/:id", () => {
      it("200 respsonse", async done => {
        const res = await request.get("/api/users/1");
        const { status } = res;
        expect(status).toBe(200);
        done();
      });
      it("responds with appropriate user data", async done => {
        const res = await request.get("/api/users/1");
        const {
          body: { user }
        } = res;
        expect(user.username).toBe("Adam");
        done();
      });
    });
    describe("Errors /users/:id", () => {
      it("404 for valid, but non existent user ID", async done => {
        const res = await request.get("/api/users/9999");
        const { status } = res;
        expect(status).toBe(404);
        done();
      });
      it("404 returns appropriate error message", async done => {
        const res = await request.get("/api/users/999");
        const {
          body: { message }
        } = res;
        expect(message).toBe("That id does not exist");
        done();
      });
      it("400 response for invalid id type (bad request)", async done => {
        const res = await request.get("/api/users/not_a_valid_id");
        const { status } = res;
        expect(status).toBe(400);
        done();
      });
    });
    describe("METHOD: PATCH users/:id", () => {
      it("returns status 200 for successful patch", async done => {
        const postReq = { avatar: "new_avatar" };
        const updatedUser = await request.patch("/api/users/1").send(postReq);
        expect(updatedUser.status).toBe(200);
        done();
      });
      it("avatar is successfully updated on patch request", async done => {
        const postReq = { avatar: "new_avatar" };
        const res = await request.patch("/api/users/1").send(postReq);
        const {
          body: { updatedUser }
        } = res;

        expect(updatedUser.avatar).toBe("new_avatar");
        done();
      });
    });
    describe("METHOD: POST users/:id", () => {
      it("201 status for post of user", async done => {
        const res = await request
          .post("/api/users/")
          .send({ username: "tblack", avatar: "this_picture" });
        const { status } = res;
        expect(status).toBe(201);
        done();
      });
    });
  });
});
