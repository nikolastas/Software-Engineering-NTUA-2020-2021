process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.env.NODE_ENV == 'test';

const { response } = require("express");
const request = require("supertest");
const app = require("../../backend/app");
var jwt;


describe("PassesCost, [data or no data | csv or json]", () => {
    test("PassesCost 400 status, access denied user not logged in [csv]", done => {
        request(app)
            .get("/interoperability/api/PassesCost/aodos/aodos/20210301/20210601?format=csv")
            .set("Cookie", ['jwt='+jwt])
            .then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });
    
        test("Login as user [system default]", done => {
            const user = {
              username: "user",
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
    test("PassesCost 402 status, no data [csv]", done => {
        request(app)
            .get("/interoperability/api/PassesCost/aodos/aodos/20211201/20211202?format=csv")
            .set("Cookie", ['jwt='+jwt])
            .then(response => {
            expect(response.statusCode).toBe(402);
            done();
        });
    });
    test("PassesCost 402 status, no data [json]", done => {
        request(app)
            .get("/interoperability/api/PassesCost/aodos/aodos/20220301/20210601?format=json")
            .set("Cookie", ['jwt='+jwt])
            .then(response => {
            expect(response.statusCode).toBe(402);
            done();
        });
    });
    test("PassesCost 200 status, with json data", done => {
      
      request(app)
        .get("/interoperability/api/PassesCost/egnatia/aodos/20200301/20210601?format=json")
        .set("Cookie", ['jwt='+jwt])
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
    test("PassesCost 200 status, with csv data", done => {
      
      request(app)
        .get("/interoperability/api/PassesCost/aodos/aodos/20210301/20210601?format=csv")
        .set("Cookie", ['jwt='+jwt])
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });