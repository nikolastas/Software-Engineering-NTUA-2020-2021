const express = require('express')

// set up express app
const app = express();

app.get('/', function(req, res){
    console.log('GET request');
    res.send({"poutsa" : "3idi", "mouni" : "den3erw"});
});


//listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('Hello, World');
});