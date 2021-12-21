const express = require('express');
const bodyParser = require('body-parser');
const con = require('./models/dbsetup');
// set up express app
const app = express();


app.use(bodyParser.json());
//initialize routes
app.use('/interoperability/api', require('./routes/api'));
app.use('/interoperability/api/admin', require('./routes/admin'));
app.use('/interoperability/api/', require('./routes/endpoints'));

//listen for requests
app.listen(process.env.port || 9103, function(){
});