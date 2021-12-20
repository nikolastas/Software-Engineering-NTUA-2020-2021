const { application } = require('express');
const express = require('express');

const router = express.Router();


//Get request response
router.get('/ninjas', function(req, res){
    res.send({type:'GET'});
});

//new data for database
router.post('/ninjas', function(req, res){
    res.send({type:'POST'});
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