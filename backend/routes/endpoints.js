const { application } = require('express');
const express = require('express');
const con = require('../models/dbsetup');
const router = express.Router();



router.get('/PassesPerStation/:stationID/:date_from/:date_to', function(req, res){
    console.log(req.stationID);
    console.log(req.date_from);
    console.log(req.date_to);
});
