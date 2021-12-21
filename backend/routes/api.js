const { application } = require('express');
const express = require('express');
const con = require('../models/dbsetup');
const router = express.Router();



//Get request response
router.get('/ninjas', function(req, res){
//     con.query("SELECT * FROM passes", function(err, result, fields){
//         if (err) throw err;
// //        console.log(result);
//         res.send(result[0].passID);
//     });
    console.log(req.query.format);
    if(req.query.format == undefined){
        console.log("Yes ma boy it is undefined\n");
        res.status(400);
        res.send("It's okeay ma boy\n");
    }
    res.send({type:'GET'});
});

//new data for database
router.post('/ninjas', function(req, res){
    console.log(req.body);
    res.send({
        type:'POST',
        name:req.body.name,
        quifsha:req.body.quifsha
    });
});

//update db /:id parameter
router.put('/ninjas/:id', function(req, res){
    
    res.send({type:'PUT'});
});

//delete from db
router.delete('/ninjas/:id', function(req, res){
    res.send({type:'DELETE'});
});



module.exports = router;