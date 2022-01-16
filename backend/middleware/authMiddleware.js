const jwt =require('jsonwebtoken');
const random = require('../models/secret');
const { Sequelize, Op, Model, DataTypes }= require("sequelize");

const sequelize = new Sequelize('softeng', 'root', null, {
    dialect: 'mysql'
  })
const User = require("../models/User")(sequelize, Sequelize);

const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt;
    
    // check if jwt exists and if is verified

    if(token){
        jwt.verify(token, random.secret, (err, decodedToken)=>{
            if(err){
                res.redirect('/login');
                console.log(err.message);
            }
            else{
                console.log(decodedToken);
                next();
            }
        });
    }
    else{
        res.redirect('/login');
    }
}
const checkUser = (req,res, next) =>{
    const token =  req.cookies.jwt;
    if(token){
        console.log("token exists");
        jwt.verify(token, random.secret, (err, decodedToken)=>{
            if(err){
                console.log("token is not valid");
                console.log(err.message);
                req.app.locals.user = null;
                // res.locals.user = null;
                next(); // user not logged in
            }
            else{
                console.log(decodedToken);
                console.log("token is valid");
                 User.findOne({
                    where:{
                        username: decodedToken.id
                    }
                }).then(user => {
                    console.log("found user");
                    console.log(user.username);
                    req.app.locals.user = user.username;
                    // res.locals.user = user.username;
                }).catch(err => {
                    console.log(err);
                });
                next();
            }
        });
    }
    else{
        req.app.locals.user = null;
        // res.locals.user = null;
        console.log("user toke doesnt exists");
        next();
    }

}
module.exports = { requireAuth, checkUser };