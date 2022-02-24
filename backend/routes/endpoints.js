const { application } = require('express');
const express = require('express');
const con = require('../models/dbsetup');
const router = express.Router();
const moment = require('moment');
const converter = require('json-2-csv');
const {requireAuth, checkUser, isAdmin } = require('../middleware/authMiddleware');

function jsonToCSV(jsonobj){
    var csvfile;
    converter.json2csv(jsonobj, (err, csv) => {
        if(err)
            throw err;
        console.log(csv)
        csvfile = csv;
    });
    console.log(csvfile)
    return csvfile;
}


function formatDate(date, time){
    var dateformatted = date.slice(0,4) + "-"+ date.slice(4,6)+"-"+
        date.slice(6,8)+" " + time;
    return dateformatted;


}

function SQLDateTimeToResponse(dateTime){
    //2021-05-30T02:12:00.000Z
    //2021-05-30 02:12:00
    var dateTime = Date.parse(dateTime.toString());
    var dateTime = moment(dateTime).format('YYYY-MM-DD HH:mm:SS');
    return `${dateTime.slice(0, 10)} ${dateTime.slice(11, 20)}`;
}



router.get('/PassesPerStation/:stationID/:date_from/:date_to', requireAuth, function(req, res){
    var datefrom = req.params.date_from;
    var dateto = req.params.date_to;

    console.log(datefrom, dateto);
    var datefromf = "'"+datefrom.slice(0,4) + "-"+ datefrom.slice(4,6)+"-"+
        datefrom.slice(6,8)+" 00:00:00'";
    console.log(datefromf);

    var datetof = "'" + dateto.slice(0,4)+"-"+dateto.slice(4,6)+"-"+dateto.slice(6,8) +" 23:59:59'";
    console.log("datetof = ", datetof);

    try{
        console.log('entered');
        var str = "SELECT * FROM passes, stations,vehicles, tag "+"WHERE  passes.VehiclesvehicleID = vehicles.vehicleID and vehicles.tagtagID = tag.tagID and stations.stationID = passes.StationsstationID AND passes.StationsstationID = '"+
        req.params.stationID+"' AND passes.timestamp >= '"+ datefrom.slice(0,4) + "-"+ datefrom.slice(4,6)+"-"+
        datefrom.slice(6,8)+" 00:00:00' AND passes.timestamp <= '"+dateto.slice(0,4)+"-"+dateto.slice(4,6)+"-"+dateto.slice(6,8) +" 23:59:59' "+
        "GROUP BY passes.timestamp";
        console.log(str);
        con.query(str,
        function(err, result, fields){
            if (err) throw err;
            if (result.length > 0){
                var Station = result[0].stationID;
                var StationOperator = result[0].Providername;
                var today = Date.now();
                var RequestTimestamp = moment(today).format('YYYY-MM-DD HH:mm:ss');
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
                        PassTimeStamp: SQLDateTimeToResponse(result[i].timestamp),
                        VehicleID: result[i].vehicleID,
                        TagProvider: result[i].tagProvider,
                        PassType: (result[i].tagProvider == result[i].Providername)?"home":"visitor",
                        PassCharge: result[i].charge
                    });
                }
                res.status(200);
                var result = {
                    "Station": Station,
                    "StationOperator": StationOperator,
                    "RequestTimestamp": RequestTimestamp,
                    "PeriodFrom": periodfrom,
                    "PeriodTo": periodto,
                    "NumberOfPasses": NumberOfPasses,
                    "PassesList": PassesList
                }
                if(req.query.format === 'csv'){
                    converter.json2csv(result, (err, csv) => {
                        if(err)
                            throw err;
                        res.send(csv);
                    });
                }
                else res.send(result);
            }
            else{
                res.status(402);
                res.send("No Data");
            }
        });
    }catch(err){
        //handle error
        res.status(500);
        res.send("Internal Server Error");
    }
});



router.get('/PassesAnalysis/:op1_ID/:op2_ID/:date_from/:date_to', requireAuth, function(req, res){
    //parse arguments
    var op1_ID = req.params.op1_ID;
    var op2_ID = req.params.op2_ID;
    var date_from = formatDate(req.params.date_from, "00:00:00");
    var date_to = formatDate(req.params.date_to, "23:59:59");

    console.log(op1_ID, op2_ID, date_from, date_to);
    try{
        var str = 
        `SELECT  Providername, tagProvider, passID, stationID, timestamp, vehicleID, charge
        FROM passes, vehicles, tag, stations
        WHERE passes.VehiclesvehicleID =vehicles.vehicleID AND vehicles.tagtagID=tag.tagID
        AND tag.tagProvider= '${op2_ID}' #OP2
        and passes.StationsstationID=stations.stationID
        AND stations.Providername= '${op1_ID}' #OP1
        AND stations.Providername!=tag.tagProvider #to leei h ekfwnhsh
        AND passes.timestamp <= '${date_to}' AND passes.timestamp >= '${date_from}'
        GROUP BY passes.timestamp`;
        console.log(str);
        con.query(str, 
        function(err, result, fields){
            if (err) throw err;
            if(result.length > 0 ){
                var today = Date.now();
                var RequestTimestamp = moment(today).format('YYYY-MM-DD HH:mm:ss');

                var NumberOfPasses = result.length;
                var PassesList = [];
                for(let i = 0; i < result.length; i++){
                    PassesList.push({
                        PassIndex: i+1,
                        PassID: result[i].passID,
                        stationID : result[i].stationID,
                        TimeStamp: SQLDateTimeToResponse(result[i].timestamp),
                        VehicleID: result[i].vehicleID,
                        PassCharge: result[i].charge
                    });

                }
                result = {
                    op1_ID : op1_ID,
                    op2_ID : op2_ID,
                    RequestTimestamp: RequestTimestamp,
                    PeriodFrom : date_from,
                    PeriodTo : date_to,
                    NumberOfPasses : NumberOfPasses,
                    PassesList : PassesList
                }
                res.status(200);
                if(req.query.format === 'csv'){
                    converter.json2csv(result, (err, csv) => {
                        if(err)
                            throw err;
                        res.send(csv);
                    });
                }
                else res.send(result);

            }
            else{
                res.status(402);
                res.send("No data");
            }
        });
    }
    catch(err){
        //DB Error 
        res.status(500);
        res.send("Internal Server Error");
    }
});


router.get('/PassesCost/:op1_ID/:op2_ID/:date_from/:date_to', requireAuth, function(req, res){
    //parse arguments
    var op1_ID = req.params.op1_ID;
    var op2_ID = req.params.op2_ID;
    var date_from = formatDate(req.params.date_from, "00:00:00");
    var date_to = formatDate(req.params.date_to, "23:59:59");


    var str = 
    `SELECT Providername, tagProvider, count(passes.passID), SUM(passes.charge)
    FROM passes, vehicles, tag, stations
    WHERE passes.VehiclesvehicleID =vehicles.vehicleID AND vehicles.tagtagID=tag.tagID
    AND tag.tagProvider='${op2_ID}' #OP2
    and passes.StationsstationID=stations.stationID
    AND stations.Providername='${op1_ID}' #OP1
    AND passes.timestamp <= '${date_to}' AND passes.timestamp >= '${date_from}'`;
    try{
        console.log(op1_ID,op2_ID , date_from , date_to, 'passescost');
        console.log(str);
        con.query(str, 
        function(err, result, fields){
            if (err) throw err;
            if(result.length > 0){
                var today = Date.now();
                var RequestTimestamp = moment(today).format('YYYY-MM-DD HH:mm:ss');

                var NumberOfPasses = result[0]['count(passes.passID)'];
                if(NumberOfPasses === 0){
                    res.status(402);
                    res.send("No data");
                    return;
                }
                var PassesCost = result[0]['SUM(passes.charge)'];


                var result = {
                    op1_ID : op1_ID,
                    op2_ID : op2_ID,
                    RequestTimestamp: RequestTimestamp,
                    PeriodFrom : date_from,
                    PeriodTo : date_to,
                    NumberOfPasses : NumberOfPasses,
                    PassesCost : PassesCost
                }
                res.status(200);
                if(req.query.format === 'csv'){
                    converter.json2csv(result, (err, csv) => {
                        if(err)
                            throw err;
                        res.send(csv);
                    });
                }
                else res.send(result);

            }
            else{
                res.status(402);
                res.send("No data");
            }
        });
    }
    catch(err){
        //DB Error 
        res.status(500);
        res.send("Internal Server Error");
    }

});




router.get('/ChargesBy/:op_ID/:date_from/:date_to', requireAuth, function(req, res){
    var op_ID = req.params.op_ID;
    var date_from = formatDate(req.params.date_from, "00:00:00");
    var date_to = formatDate(req.params.date_to, "23:59:59");


    var str = 
    `SELECT Providername, tagProvider , COUNT(passID), SUM(charge)
    FROM passes, vehicles, tag, stations
    WHERE passes.VehiclesvehicleID =vehicles.vehicleID AND vehicles.tagtagID=tag.tagID
    AND passes.StationsstationID=stations.stationID
    AND stations.Providername='${op_ID}' #op
    AND tag.tagProvider!='${op_ID}'
    AND passes.timestamp <= '${date_to}' AND passes.timestamp >= '${date_from}'
    GROUP BY tagProvider`;
    try{
        con.query(str, 
        function(err, result, fields){
            if (err) throw err;
            console.log("result = ", result);
            if(result.length > 0){
                var today = Date.now();
                var RequestTimestamp = moment(today).format('YYYY-MM-DD HH:mm:ss');
                PPOList = [];
                for(let i = 0; i < result.length; i++){
                    if(result[i]['COUNT(passID)'] > 0){
                        PPOList.push({
                            VisitingOperator : result[i].tagProvider,
                            NumberOfPasses : result[i]['COUNT(passID)'],
                            PassesCost : result[i]['SUM(charge)']
                        });
                    }
                    
                }
                
                if(PPOList != []){
                    res.status(200);
                    result = {
                        op_ID : op_ID,
                        RequestTimestamp: RequestTimestamp,
                        PeriodFrom : date_from,
                        PeriodTo : date_to,
                        PPOList : PPOList
                    };


                    if(req.query.format === 'csv'){
                        converter.json2csv(result, (err, csv) => {
                            if(err)
                                throw err;
                            res.send(csv);
                        });
                    }
                    else res.send(result);
                }
                
                else{
                    res.status(402);
                    res.send("No data");    
                }
                

            }
            else{
                res.status(402);
                res.send("No data");
            }
        });
    }
    catch(err){
        //DB Error 
        res.status(500);
        res.send("Internal Server Error");
    }







});

router.get('/Stations', (req, res) => {
    let str = 'SELECT * FROM stations';
    try{
        con.query(str, (err, result, fields) => {
            if(err) throw err;
            // console.log(result);
            res.status(200);
            res.send(result);
        });
        
    }
    catch(err){
        console.log(err);
        res.status(500);
        res.send('Internal Server Error');
    }

});

module.exports = router;