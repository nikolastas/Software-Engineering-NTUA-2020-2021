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
        var str = "SELECT * FROM passes, stations,vehicles, tag "+"WHERE  passes.VehiclesvehicleID = vehicles.vehicleID and vehicles.tagtagID = tag.tagID and stations.stationID = passes.StationsstationID AND passes.StationsstationID = '"+
        req.params.stationID+"' AND passes.timestamp >= '"+ datefrom.slice(0,4) + "-"+ datefrom.slice(4,6)+"-"+
        datefrom.slice(6,8)+" 00:00:00' AND passes.timestamp <= '"+dateto.slice(0,4)+"-"+dateto.slice(4,6)+"-"+dateto.slice(6,8) +"23:59:59' "+
        "GROUP BY passes.timestamp";
        console.log(str);
        console.log("koukou");
        con.query(str,
        function(err, result, fields){
            if (err) throw err
            if (result.length > 0){
                var Station = result[0].stationID;
                var StationOperator = result[0].Providername;
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date+' '+time
                var RequestTimestamp = dateTime;
                var periodfrom = datefrom.slice(0,4) + "-"+ datefrom.slice(4,6)+"-"+
                datefrom.slice(6,8)+ " 00:00:00";
                var periodto = dateto.slice(0,4) + "-"+ dateto.slice(4,6)+"-"+
                dateto.slice(6,8)+ " 23:59:59";
                var NumberOfPasses = result.length;
                var PassesList = [];
                for(let i = 0; i < NumberOfPasses; i++){
                    PassesList.push({
                        PassIndex: i+1,
                        PassID: result[i].passID,
                        PassTimeStamp: result[i].timestamp,
                        VehicleID: result[i].vehicleID,
                        TagProvider: result[i].tagProvider,
                        PassType: (result[i].tagProvider == result[i].Providername)?"home":"visitor",
                        PassCharge: result[i].charge
                    });
                }
                res.status(200);
                res.send({
                    "Station": Station,
                    "StationOperator": StationOperator,
                    "RequestTimestamp": RequestTimestamp,
                    "PeriodFrom": periodfrom,
                    "PeriodTo": periodto,
                    "NumberOfPasess": NumberOfPasses,
                    "PassesList": PassesList
                });
            }else{
                res.status(402);
                res.send("No Data");
            }
        });
    }catch(err){
        //handle error
        
    }
    console.log("ta pame");
});

module.exports = router;