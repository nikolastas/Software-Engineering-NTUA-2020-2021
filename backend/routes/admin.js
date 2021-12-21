const { application } = require('express');
const express = require('express');
const con = require('../models/dbsetup');
const router = express.Router();

const fs = require('fs');
const csv = require('csv-parser');
const e = require('express');


/*
 * erase table from db with tablename.
 */
function eraseTable(tablename){
    try{
        con.query("TRUNCATE TABLE " + tablename, function(err, result, fields){
            if (err) throw err
        });
    }catch(err){
        //handle error
        return false;
    }
    return true;
}


/*
 * Healthcheck handler
 */
router.get('/healthcheck', function(req, res){
    //Check if connection holds
    if(con.state == 'disconnected'){
        res.status(500);
        res.send({"status":"failed", "dbconnection":""});
    }
    else{
        res.status(200);
        res.send({"status":"OK", "dbconnection":"mysql"});
    }
});





//Resets Passes.
router.post('/resetpasses', function(req, res){
    
    if(eraseTable("passes")){
        res.status(200);
        res.send({"status":"OK"});    
    }
    else{
        //handle error
        res.status(500);
        res.send({"status":"failed"});
    }

});



//Resets stations (tries to)
router.post('/resetstations', function(req, res){
    if(eraseTable("stations")){
        fs.createReadStream('./defaults/sampledata01_stations.csv')
            .pipe(csv())
            .on('data', function(row){
                //We must add to the database the station
                var station = row;
                //Query on the base to add to stations
                try{
                    con.query(
                    "INSERT INTO `stations` (`stationID`, `stationName`, `Providername`, `Providerabbr`) VALUES ('"+ station.stationID+
                    "', '"+station.stationName+"', '"+station.Providername+"', '"+station.Providerabbr+"')"
                    , function(err, result, fields){
                        if (err) throw err
                    });
                }catch(err){
                    //handle error
                    console.log("failed to add ");
                    console.log(row);
                }
            })
            .on('end', function(){
                console.log("end of data\n");
            });
    }
    else{
        res.status(500);
        res.send({"status":"failed"});
    }

    res.status(200);
    res.send({"status":"OK"});    
    
});




//reset vehicles.
router.post('/resetvehicles', function(res, req){
    if(eraseTable("vehicles")){
        fs.createReadStream('./defaults/sampledata01_vehicles_100.csv')
            .pipe(csv())
            .on('data', function(row){
                //We must add to the database the station
                var vehicle = row;
                //Query on the base to add to stations
                try{
                    con.query(
                    "INSERT INTO `vehicles` (`vehicleID`, `licenseYear`, `tagtagID`) VALUES ('"+
                    vehicle.vehicleID+"', "+vehicle.licenseYear+", '"+ vehicle.tagtagID +"'),", 
                    function(err, result, fields){
                        if (err) throw err
                    });
                }catch(err){
                    //handle error
                    console.log("failed to add ");
                    console.log(row);
                }
            })
            .on('end', function(){
                console.log("end of data\n");
            });

    }
    else{
        res.status(500);
        res.send({"status":"failed"});
    }

    res.status(200);
    res.send({"status":"OK"});    
    


})





module.exports = router;