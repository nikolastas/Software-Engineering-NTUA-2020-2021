const { application } = require('express');
const express = require('express');
const con = require('../models/dbsetup');
const router = express.Router();
const moment = require('moment');


router.get('/PassesPerStation/:stationID/:date_from/:date_to', function(req, res){
    // console.log(req.params.stationID);
    // var datefrom = req.params.date_from;
    // var dateto = req.params.date_to;
    //console.log(date.slice(0,4)+'-'+date.slice(4,6)+'-'+date.slice(6,8));
    // console.log(req.params.date_to);
    try{
        con.query("SELECT * FROM passes "+
        `WHERE StationsstationID = ${req.params.stationID} AND timestamp <= 
        '${datefrom.slice(0,4)+'-'+datefrom.slice(4,6)+'-'+datefrom.slice(6,8)} 00:00:00'`+
        `AND timestamp >= '${dateto.slice(0,4)+'-'+dateto.slice(4,6)+'-'+dateto.slice(6,8)} 23:59:59' 
        && SELECT name FROM provider WHERE name= ?` ,
         function(err, result, fields){
            if (err) throw err
        });
    }catch(err){
        //handle error
        return false;
    }
});

module.exports = router;