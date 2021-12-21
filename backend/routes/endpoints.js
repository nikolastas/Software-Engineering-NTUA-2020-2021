const { application } = require('express');
const express = require('express');
const con = require('../models/dbsetup');
const router = express.Router();
const moment = require('moment');


router.get('/PassesPerStation/:stationID/:date_from/:date_to', function(req, res){
    var datefrom = req.params.date_from;
    var dateto = req.params.date_to;
    
    try{
        console.log('entered');
        var str = "SELECT * FROM passes, stations "+"WHERE stations.stationID = passes.StationsstationID AND passes.StationsstationID = '"+
        req.params.stationID+"' AND passes.timestamp <= '"+ datefrom.slice(0,4) + "-"+ datefrom.slice(4,6)+"-"+
        datefrom.slice(6,8)+" 00:00:00' AND passes.timestamp >= '"+dateto.slice(0,4)+"-"+dateto.slice(4,6)+"-"+dateto.slice(6,8) +"23:59:59'";
        console.log(str);
        console.log("koukou");
        con.query(str,
        function(err, result, fields){
            if (err) throw err
            console.log(result[0]);
        });
    }catch(err){
        //handle error
        
    }
    console.log("ta pame");
});

module.exports = router;