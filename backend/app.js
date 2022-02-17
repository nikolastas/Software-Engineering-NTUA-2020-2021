const express = require('express');
const bodyParser = require('body-parser');
const con = require('./models/dbsetup');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser, isAdmin } = require('./middleware/authMiddleware');
const cors = require('cors');
const fs = require('fs');
const key = fs.readFileSync('../cert/CA/localhost/localhost.decrypted.key');
const cert = fs.readFileSync('../cert/CA/localhost/localhost.crt');
const https = require('https');

// set up express app
const app = express();
// app.locals.user = null;
//middleweare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
//initialize routes
app.use('/interoperability/api/admin', require('./routes/admin'));
app.use('/interoperability/api/', require('./routes/endpoints'));

app.get('/interoperability/api/authToken', requireAuth, (req,res) => res.send("cookie authinticate succesfully!") );
app.get('/interoperability/api/checkUser', checkUser, (req,res) => res.send({"user":app.locals.user}) );
app.get('/interoperability/api/isAdmin', isAdmin, (req,res) => res.send("user is Amdin"));
app.use(authRouter);


//cokies

//https

const server = https.createServer({ key, cert }, app);


module.exports = server;
//listen for requests
// const port = 9103;
// server.listen(process.env.port || port, () => {
//     console.log(`Server is listening on https://localhost:${port}`);
//   });
// app.listen(process.env.port || 9103, function(){
// });