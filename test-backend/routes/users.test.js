process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const { response } = require("express");
const request = require("supertest");
const app = require("../../backend/app");
var jwt;

describe("Test the root path", () => {
  test("It should response the POST method", done => {
    const user = {
      username: "admin",
      password: "Softeng2022"
    };
    request(app)
      .post("/interoperability/api/login")
      .send(user)
      .then(response => {
        
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeTruthy();
        jwt = response.body.token;
        done();
      });
  });
});

describe("Test the root path", () => {
  test("It should response the POST method", done => {
    request(app)
      .post("/interoperability/api/admin/healthcheck")
      .set('x-observatory-auth', jwt)
      .then(response => {
        
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});