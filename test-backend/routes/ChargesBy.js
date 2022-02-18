process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

process.env.NODE_ENV == 'test';

const { response } = require("express");
const request = require("supertest");
const app = require("../../backend/app");
var jwt;


describe("ChargesBy, [data or no data | csv or json]", () => {
    test("ChargesBy 400 status, access denied user not logged in [csv]", done => {
        request(app)
            .get("/interoperability/api/ChargesBy/aodos/20200112/20200116?format=csv")
            .set("Cookie", ['jwt='+jwt])
            .then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });
    
        test("ChargesBy: Login as user [system default]", done => {
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
    test("ChargesBy 402 status, no data [csv]", done => {
        request(app)
            .get("/interoperability/api/ChargesBy/aodos/20210112/20200116?format=csv")
            .set("Cookie", ['jwt='+jwt])
            .then(response => {
            expect(response.statusCode).toBe(402);
            done();
        });
    });
    test("ChargesBy 402 status, no data [json]", done => {
        request(app)
            .get("/interoperability/api/ChargesBy/aodos/20210111/20200116?format=json")
            .set("Cookie", ['jwt='+jwt])
            .then(response => {
            expect(response.statusCode).toBe(402);
            done();
        });
    });
    test("ChargesBy 200 status, with json data", done => {
      
      request(app)
        .get("/interoperability/api/ChargesBy/gefyra/20190101/20200225?format=json")
        .set("Cookie", ['jwt='+jwt])
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
    test("ChargesBy 200 status, with csv data", done => {
      
      request(app)
        .get("/interoperability/api/ChargesBy/olympia_odos/20190111/20200116?format=csv")
        .set("Cookie", ['jwt='+jwt])
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });