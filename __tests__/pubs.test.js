process.env.NODE_ENV = "test";
const { app } = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const knex = require("../db/connection");

beforeAll(() => {
  return knex.seed.run()
})
afterAll(done => {
  knex.destroy()
  done()
})

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
    describe('GET - /pubs/:id', () => {
      it('200 respsonse', async done => {
        const res = await request.get("/api/pubs/1")
        const { status } = res
        expect(status).toBe(200)
        done()
      });
      it('responds with appropriate pub data', async done => {
        const res = await request.get("/api/pubs/2")
        const { body: { pub } } = res
        expect(pub.pub_name).toBe("The Three Horseshoes")
        done()
      });
      describe('ERRORS /pubs/:id', () => {
        it('404 for valid, but non existent user ID', async done => {
          const res = await request.get("/api/pubs/9999")
          const { status } = res
          expect(status).toBe(404)
          done()
        });
        it('404 returns appropriate error message', async done => {
          const res = await request.get("/api/pubs/999")
          const { body: { message } } = res
          expect(message).toBe("That id does not exist")
          done()
        });
        it('400 response for invalid id type (bad request)', async done => {
          const res = await request.get("/api/pubs/not_a_valid_id")
          const { status } = res
          expect(status).toBe(400)
          done()
        });
      });
    });
  });
});
