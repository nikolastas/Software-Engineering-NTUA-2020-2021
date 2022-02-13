const { application } = require('express');
const express = require('express');
const con = require('../models/dbsetup');
const router = express.Router();

const fs = require('fs');
const csv = require('csv-parser');
const e = require('express');
const { table } = require('console');
const {requireAuth, checkUser, isAdmin } = require('../middleware/authMiddleware');
const bodyParser = require('body-parser');


/*
 * erase table from db with tablename.
 */
// from 1/1/2019 6:10 to 01-01-2019 06:10:00
function formatdate(input){
    input=new Date(input);
    year = input.getFullYear();
    month = input.getMonth()+1;
    dt = input.getDate();
    var [hour, minutes] = [input.getHours(), input.getMinutes()];
    //time="23:00:00";
    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    if (hour<10){
        hour= '0' + hour;
    }
    if (minutes<10){
        minutes= '0' + minutes;
    }
    return(year+'-' + month + '-'+ dt + ' '+ hour+ ':'+minutes+':'+'00');
}

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
function eraseRefTableHead(tablename){
    if(tablename === "vehicles"){
        try{
            con.query('ALTER TABLE passes DROP FOREIGN KEY vehicleid_to_vehicle_id', function(err, result, fields){});
            con.query('truncate TABLE vehicles', function(err, result, fields){});
            return true;
        }
        catch(err){
            return false;
        }
    }
    else if(tablename === "stations"){
        try{
            con.query('ALTER TABLE passes DROP FOREIGN KEY stationid_to_stationid', function(err, result, fields){});
            con.query('truncate TABLE stations', function(err, result, fields){});
            return true;
        }
        catch(err){
            return false;
        }
    }

}
function eraseRefTableTail(tablename){
    try{
        if(tablename === "stations"){
            con.query('ALTER TABLE passes ADD CONSTRAINT stationid_to_stationid foreign key (StationsstationID) references stations (stationID)', function(err, result, fields){});
        }
        else if(tablename === "vehicles"){
            con.query('ALTER TABLE passes ADD constraint vehicleid_to_vehicle_id foreign key (VehiclesvehicleID) references vehicles (vehicleID)', function(err, result, fields){});
        }
        return true;
    }
    catch (err){
        return false;
    }
}

/*
 * Healthcheck handler
 */
router.get('/healthcheck', isAdmin,function(req, res){
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
router.post('/resetpasses', isAdmin,function(req, res){
    
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

//Passes update endpoint
router.post('/passesupd', isAdmin, function(req, res){
    console.log("trying to update from csv");
    flag = false;
    try{
            fs.createReadStream(req.body.source)

                .pipe(csv({ separator: ';' }))
                .on('data', function(row){
                    
                    var pass = row;
                    console.log(pass.passID);
                    var time=moment(input, "D/M/YYYY H:m").format("YYYY-MM-DD HH:mm:SS"); //pass.timestamp=1/1/2019 6:10                    
                    con.query(
                    "INSERT INTO softeng.passes (VehiclesvehicleID, StationsstationID, passID, timestamp, charge) VALUES ('"+ pass.vehicleID+
                    "', '"+pass.stationID+"', '"+pass.passID+"', '"+time+"', '" +pass.charge+"')"
                    , function(err, result, fields){
                        if (err) {
                            console.log(err);
                            res.status(500).send({"status":"failed"});
                            return;
                        }
                        else if(result){
                            console.log(result);
                        }
                    });
                })
                .on('end', function(){
                    console.log("end of data\n");
                    
                });
            
    }catch(error){
        //handle error
        console.log("failed to update");
        console.log(row);
        res.status(500);
        res.send({"status":"failed"});
    }

    res.status(200);
    res.send({"status":"OK"});    
    
});

//Resets stations (tries to)
router.post('/resetstations', isAdmin, function(req, res){
    
    try{
        //Removes constraints to other tables needed and truncates the table
        if(eraseRefTableHead("stations"))
        {
            
            fs.createReadStream('./defaults/sampledata01_stations.csv')
                .pipe(csv())
                .on('data', function(row){
                    //We must add to the database the station
                    var station = row;
                    //Query on the base to add to stations
                    con.query(
                    "INSERT INTO softeng.stations (stationID, stationName, Providername, Providerabbr) VALUES ('"+ station.stationID+
                    "', '"+station.stationName+"', '"+station.stationProvider+"', '"+station.providerAbbr+"')"
                    , function(err, result, fields){
                        if (err) {
                            return;
                        }
                    });
                })
                .on('end', function(){
                    console.log("end of data\n");
                });
            
            //Adds Back the constraints needed for DB to work
            if(!eraseRefTableTail("stations")){
                throw "eraseRefTableTail errror";
            }
            
        }
        else{
            throw "eraseRefDidn'twork";
        }


    }catch(error){
        //handle error
        console.log("failed to add ");
        console.log(row);
        res.status(500);
        res.send({"status":"failed"});
    }

    res.status(200);
    res.send({"status":"OK"});    
    
});


//reset vehicles.
router.post('/resetvehicles', isAdmin, function(req, res){
    try{
        if(eraseRefTableHead("vehicles")){
            fs.createReadStream('./defaults/sampledata01_vehicles_100.csv')
                .pipe(csv())
                .on('data', function(row){
                    //We must add to the database the station
                    var vehicle = row;
                    //Query on the base to add to stations
                    try{
                        con.query(
                        "INSERT INTO softeng.vehicles (vehicleID, licenseYear, tagtagID) VALUES ('"+
                        vehicle.vehicleID+"', "+vehicle.licenseYear+", '"+ vehicle.tagID +"')", 
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

                if(!eraseRefTableTail("vehicles")){
                    throw "eraseRefTableTail errror";
                }
            }
            else{
               throw "eraseRefTableHead";
            }
    }
    catch(error){
        res.status(500);
        res.send({"status":"failed"});
    }
    res.status(200);
    res.send({"status":"OK"});    
    


})



module.exports = router;