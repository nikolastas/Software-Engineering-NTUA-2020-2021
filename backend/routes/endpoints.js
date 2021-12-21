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
        con.query("SELECT * FROM passes, stations "+
        `WHERE stations.stationID = passes.StationsstationID 
        AND passes.StationsstationID = ${req.params.stationID} AND passes.timestamp <= 
        '${datefrom.slice(0,4)+'-'+datefrom.slice(4,6)+'-'+datefrom.slice(6,8)} 00:00:00'`+
        `AND passes.timestamp >= '${dateto.slice(0,4)+'-'+dateto.slice(4,6)+'-'+dateto.slice(6,8)} 23:59:59'` ,
        function(err, result, fields){
            if (err) throw err
            console.log(result);
        });
    }catch(err){
        //handle error
        return false;
    }
});

module.exports = router;