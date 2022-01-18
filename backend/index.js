const express = require('express');
const bodyParser = require('body-parser');
const con = require('./models/dbsetup');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser } = require('./middleware/authMiddleware');
const cors = require('cors');
// set up express app
const app = express();
app.locals.user = null;
//middleweare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
//initialize routes
app.use('/interoperability/api/admin', require('./routes/admin'));
app.use('/interoperability/api/', require('./routes/endpoints'));
app.get('/interoperability/api/authToken', requireAuth, (req,res) => res.send("all ok!") );
app.get('/interoperability/api/checkUser', checkUser, (req,res) => res.send(app.locals.user) );

app.use(authRouter);

//cokies



//listen for requests
app.listen(process.env.port || 9103, function(){
});