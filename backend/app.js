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
const path = require('path');

const https = require('https');

// set up express app
const app = express();
// app.locals.user = null;
//middleweare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// var corsOptions = {
// 	origin: '*'
// 	// credentials: true,
// 	// exposedHeaders: ["set-cookie"]
// };
app.use(cors({credentials: true, origin: 'https://localhost:3000'}));
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
//initialize routes
app.use('/interoperability/api/admin', require('./routes/admin'));
app.use('/interoperability/api/', require('./routes/endpoints'));

app.get('/interoperability/api/authToken', requireAuth, (req,res) => res.send("cookie authinticate succesfully!") );
app.get('/interoperability/api/checkUser', checkUser, (req,res) => res.send({"user":app.locals.user}) );
app.get('/interoperability/api/isAdmin', isAdmin, (req,res) => res.send("user is Amdin"));
app.use(authRouter);

//for serving files
app.use(express.static(path.join(__dirname, '../frontend/build')));

//serve React
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

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