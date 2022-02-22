process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.env.NODE_ENV == 'test';

const { response } = require("express");
const request = require("supertest");
const app = require("../../backend/app");
var jwt;

function getCookie(name, response) {
  var ca = (response.headers['set-cookie'].toString().split(';'));
  // console.log("ca= ",ca);
  var nameEQ = 'jwt' + "=";
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    // console.log("i= ",i, " c= ", c, "type of c= ", typeof(c));
    c = c.split('=');
    cookie_name = c[0];
    cookie_value = c[1];
    if(cookie_name == name && cookie_value !== 'j%3Anull' ) return cookie_value;
    else if (i == ca.length-1 || cookie_value == 'j%3Anull') return null;
  }
}

describe("PassesAnalysis, [data or no data | csv or json]", () => {
    test("PassesAnalysis 400 status, access denied user not logged in [csv]", done => {
        request(app)
            .get("/interoperability/api/PassesAnalysis/gefyra/aodos/20190201/20200909?format=csv")
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
                jwt = getCookie("jwt", response);
                expect(jwt).not.toBeNull();
                done();
              });
          });
    test("PassesAnalysis 402 status, no data [csv]", done => {
        request(app)
            .get("/interoperability/api/PassesAnalysis/aodos/aodos/20190201/20200909?format=csv")
            .set("Cookie", ['jwt='+jwt])
            .then(response => {
            expect(response.statusCode).toBe(402);
            done();
        });
    });
    test("PassesAnalysis 402 status, no data [json]", done => {
        request(app)
            .get("/interoperability/api/PassesAnalysis/aodos/egnatia/20220301/20210601?format=json")
            .set("Cookie", ['jwt='+jwt])
            .then(response => {
            expect(response.statusCode).toBe(402);
            done();
        });
    });
    test("PassesAnalysis 200 status, with json data", done => {
      
      request(app)
        .get("/interoperability/api/PassesAnalysis/aodos/egnatia/20190201/20190209?format=json")
        .set("Cookie", ['jwt='+jwt])
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
    test("PassesAnalysis 200 status, with csv data", done => {
      
      request(app)
        .get("/interoperability/api/PassesAnalysis/nea_odos/aodos/20190201/20200909?format=csv")
        .set("Cookie", ['jwt='+jwt])
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });