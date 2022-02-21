process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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
describe("Admin Testing, [login, healthcheck, reset]",  () => {
  test("[unauthorised] Resets all passes",  done => {
    request(app)
      .post("/interoperability/api/admin/resetpasses", )
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
        console.log(jwt);
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
      jwt = getCookie("jwt", response);
      expect(jwt).toBeNull();
      console.log(jwt);
      done();
    });
});


  test("Login as admin [system default]", done => {
    const user = {
      username: "admin",
      password: "Softeng2023"
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




