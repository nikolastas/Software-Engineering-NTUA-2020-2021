process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const { response } = require("express");
const request = require("supertest");
const app = require("../../backend/app");
var jwt;

describe("Admin Testing, [login, healthcheck, reset]", () => {
  test("Login as admin [system default]", done => {
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
  test("Check the health of the backend", done => {
    request(app)
      .get("/interoperability/api/admin/healthcheck")
      .set("Cookie", ['jwt='+jwt])
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("Resets all passes", done => {
    request(app)
      .post("/interoperability/api/admin/resetpasses")
      .set("Cookie", ['jwt='+jwt])
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("Resets all vehicles", done => {
    request(app)
      .post("/interoperability/api/admin/resetvehicles")
      .set("Cookie", ['jwt='+jwt])
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("Resets all stations", done => {
    request(app)
      .post("/interoperability/api/admin/resetstations")
      .set("Cookie", ['jwt='+jwt])
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });


});




