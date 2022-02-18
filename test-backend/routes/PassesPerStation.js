process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.env.NODE_ENV == 'test';

const { response } = require("express");
const request = require("supertest");
const app = require("../../backend/app");
var jwt;


describe("PassesPerStation, [data or no data | csv or json]", () => {
    test("PassesPerStation 400 status, access denied user not logged in [csv]", done => {
        request(app)
            .get("/interoperability/api/PassesPerStation/AO01/20210301/20210601?format=json")
            .set("Cookie", ['jwt='+jwt])
            .then(response => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });
    
        test("Login as user [system default]{PassesPerStation}", done => {
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
    test("PassesPerStation 402 status, no data [csv]", done => {
        request(app)
            .get("/interoperability/api/PassesPerStation/GF00/20211103/20210104?format=csv")
            .set("Cookie", ['jwt='+jwt])
            .then(response => {
            expect(response.statusCode).toBe(402);
            done();
        });
    });
    test("PassesPerStation 402 status, no data [json]", done => {
        request(app)
            .get("/interoperability/api/PassesPerStation/AO01/20210303/20210304?format=json")
            .set("Cookie", ['jwt='+jwt])
            .then(response => {
            expect(response.statusCode).toBe(402);
            done();
        });
    });
    test("PassesPerStation 200 status, with json data", done => {
      
      request(app)
        .get("/interoperability/api/PassesPerStation/GF00/20210103/20210304?format=json")
        .set("Cookie", ['jwt='+jwt])
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
    test("PassesPerStation 200 status, with csv data", done => {
      
      request(app)
        .get("/interoperability/api/PassesPerStation/AO01/20210103/20210704?format=csv")
        .set("Cookie", ['jwt='+jwt])
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });