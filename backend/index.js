const express = require('express');
const bodyParser = require('body-parser');
const con = require('./models/dbsetup');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser } = require('./middleware/authMiddleware');

// set up express app
const app = express();

//middleweare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//initialize routes
app.use('/interoperability/api/admin', require('./routes/admin'));
app.use('/interoperability/api/', require('./routes/endpoints'));
app.get('/authToken', requireAuth, (req,res) => res.send("all ok!"));
app.get('/checkUser', checkUser, (req,res) => res.send(res.locals.user))
app.use(authRouter);

//cokies



//listen for requests
app.listen(process.env.port || 9103, function(){
});