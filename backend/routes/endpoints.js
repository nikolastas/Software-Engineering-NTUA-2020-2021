const { application } = require('express');
const express = require('express');
const con = require('../models/dbsetup');
const router = express.Router();
const moment = require('moment');


router.get('/PassesPerStation/:stationID/:date_from/:date_to', function(req, res){
    // console.log(req.params.stationID);
    var date = req.params.date_from;
    var formated = moment(date).format('YYYY-MM-DD hh:mm:ss')
    console.log(formated);
    // console.log(req.params.date_to);
    // try{
    //     con.query("SELECT * FROM passes "+
    //     `WHERE StationsstationID = ${req.params.stationID} AND timestamp <=  `+
    //     "AND timestamp >= ? && SELECT name FROM provider WHERE name= ?" ,
    //      function(err, result, fields){
    //         if (err) throw err
    //     });
    // }catch(err){
    //     //handle error
    //     return false;
    // }
});

module.exports = router;