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
        jwt.verify(token, random.secret, (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next(); // user not logged in
            }
            else{
                console.log(decodedToken);
                 User.findOne({
                    where:{
                        username: decodedToken.id
                    }
                }).then(user => {
                    res.locals.user = user;
                }).catch(err => {
                    console.log(err);
                });
                next();
            }
        });
    }
    else{
        res.locals.user = null;
        next();
    }

}
module.exports = { requireAuth, checkUser };