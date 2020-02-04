process.env.NODE_ENV = "test";
const { app } = require("../app");
const supertest = require("supertest");
const request = supertest(app);


describe('Endpoint: /users', () => {
  describe('GET /users', () => {
    it('200 response', async done => {
      const res = await request.get("/api/users")
      expect(res.status).toBe(200)
      done();
    });
    it('responds with correct JSON data', async done => {
      const res = await request.get("/api/users")
      const { body: { users } } = res
      expect(users[0].id).toBe(1)
      expect(users[1].id).toBe(2)
      done()
    });
  });
  describe('ERRORS /users', () => {
    it('404 response', async done => {
      const res = await request.get("/api/NOT_USER_ENDPOINT")
      const { body: { message }, status } = res
      expect(status).toBe(404)
      expect(message).toBe("Route not found")
      done()
    });
  });
  describe('/users/:id', () => {
    describe('GET /users/:id', () => {
      it('200 respsonse', async done => {
        const res = await request.get("/api/users/1")
        const { status } = res
        expect(status).toBe(200)
        done()
      });
      it('responds with appropriate user data', async done => {
        const res = await request.get("/api/users/1")
        const { body: { user } } = res
        expect(user.username).toBe("Adam")
        done()
      });
    });
    describe('Errors /users/:id', () => {
      it('404 for valid, but non existent user ID', async done => {
        const res = await request.get("/api/users/9999")
        const { status } = res
        expect(status).toBe(404)
        done()
      });
    });
  });
});
