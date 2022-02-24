process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const { response } = require("express");
const request = require("supertest");
const app = require("../../backend/app");
const https = require('https');

var jwt;
function getCookie(name, response) {
        
  return response.headers['set-cookie'].name;
}
describe("Admin Testing, [login, healthcheck, reset]",  () => {
  test("[unauthorised] Resets all passes",  done => {
    request(app)
      .post("/interoperability/api/admin/resetpasses", )
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
        var ca = (response.headers['set-cookie'].toString().split(';'));
        var nameEQ = 'jwt' + "=";
        // const jwt;
        for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) jwt = c.substring(nameEQ.length,c.length);
        }
        done();
      });
  });
  test("Check the health of the backend", done => {
    request(app)
      .get("/interoperability/api/admin/healthcheck")
      .set("Cookie", ['jwt='+jwt])
      .then(response => {
        expect(response.statusCode).toBe(401);
        done();
      });
  });
test("Logout from user", done => {

  request(app)
    .post("/interoperability/api/logout")
    .set("Cookie", ['jwt='+jwt])
    .then(response => {
      
      expect(response.statusCode).toBe(200);
      console.log(getCookie(jwt, response));
      jwt = getCookie(jwt, response);
      done();
    });
});


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
        var ca = (response.headers['set-cookie'].toString().split(';'));
                var nameEQ = 'jwt' + "=";
                // const jwt;
                for(var i=0;i < ca.length;i++) {
                  var c = ca[i];
                  while (c.charAt(0)==' ') c = c.substring(1,c.length);
                  if (c.indexOf(nameEQ) == 0) jwt = c.substring(nameEQ.length,c.length);
                }
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
  test("Resets all passes",  done => {
    request(app)
      .post("/interoperability/api/admin/resetpasses", )
      .set("Cookie", ['jwt='+jwt])
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  // jest.setTimeout(100000);
  it ("Upload all vehicles",async () => {
    const res = await request(app)
      .post("/interoperability/api/admin/passesupd")
      .set("Cookie", ['jwt='+jwt])
      .send({source: './defaults/passes_full_original.csv'});
    expect(res.statusCode).toBe(200);

  });
  it ("Upload all vehicles, again [400 error] ",async () => {
    const res = await request(app)
      .post("/interoperability/api/admin/passesupd")
      .set("Cookie", ['jwt='+jwt])
      .send({source: './defaults/passes_full_original.csv'});
    expect(res.statusCode).toBe(400);

  });
  it ("Upload all vehicles, again [500 error] ",async () => {
    const res = await request(app)
      .post("/interoperability/api/admin/passesupd")
      .set("Cookie", ['jwt='+jwt])
      .send({source: './defaults/<unrelated_file>.csv'});
    expect(res.statusCode).toBe(500);

  });
  jest.setTimeout(40000);
  it ("Resets all vehicles",async () => {
    const res = await request(app)
      .post("/interoperability/api/admin/resetvehicles")
      .set("Cookie", ['jwt='+jwt]);
    expect(res.statusCode).toBe(200);

  });
  it("Resets all stations", async () => {
    
    const res = await request(app)
      .post("/interoperability/api/admin/resetstations")
      .set("Cookie", ['jwt='+jwt]);
      // expre
    // expect.assertions(1);
    // const status = await  requestFromApp("/interoperability/api/admin/resetstations",jwt);
    expect(res.statusCode).toBe(200);

  });


});




