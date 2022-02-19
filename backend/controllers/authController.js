
const { Sequelize, Op, Model, DataTypes }= require("sequelize");

const sequelize = new Sequelize('softeng', 'root', null, {
    dialect: 'mysql'
  })
const User = require("../models/User")(sequelize, Sequelize);
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser')
var bcrypt = require("bcryptjs");
const random = require('../models/secret');

//create token
const createToken = (id) =>{
    return jwt.sign({ id }, random.secret, { 
        expiresIn: 60*60*7 // 7 days
    });
}

//handle errors
const handleErrors = (err) =>{
    var errors = [];
    if(err.original){
        if(err.original.errno==1062){
            console.log("user already exists in db");
            errors.push("user already exists in db");
        }
    }
    if(err.message){
        console.log(err.message, err.code);
        errors.push(err.message);
    }
    return errors;
    
}

module.exports.signup_post = async (req, res) =>{
    const userName = req.body.username;
    const passWord = req.body.password;
    const typeOfUser = req.body.typeOfUser;
    const Email = req.body.email;
    
    try {
        // object = {username, password, typeOfUser};
        // const errors = validate(object);
        const user = await User.create({
            username: userName,
            password: passWord,
            typeofuser: typeOfUser,
            email: Email
          }).then( user =>{
            
            const token = createToken(user.dataValues.username);
            console.log("[signup] token created" );
            res.cookie('jwt', token, { httpOnly:true, maxAge:1000*60*60*7 });
            res.status(200).send(
                {
                    username: user.username,
                    email: user.email,
                    typeOfUser: user.typeofuser,
                    token: token
                }
            );
            console.log("user created + sent token");
            //do something when User is created
          });
      }
      catch(err) {
        const errors = handleErrors(err);
        res.status(400).send(String(errors));
      }
}
module.exports.login_post = async (req, res) =>{
    var userName = req.body.username;
    var pass = req.body.password;
    try{ 
        User.findOne({
            where:{
                username: userName
            }
        }).then(user => {
            if(!user){
                res.status(400).send("no user found");
            }
            else{
                console.log("user found");
                const auth = bcrypt.compareSync(pass, user.dataValues.password);
                if(auth){
                    const token = createToken(user.dataValues.username );
                    console.log("[login] token created" );
                    res.cookie('jwt', token, { httpOnly:true, maxAge:1000*60*60*7 });
                    res.status(200).send({
                        username: user.username,
                        email: user.email,
                        typeOfUser: user.typeofuser,
                        token: token
                    });
                    console.log("user loged in + sent token");
                }
                else{
                    res.cookie('jwt', null);
                    res.status(401).send("password not match");
                }
            }

        })
    }catch(err){
        
        console.log(err);
        res.status(500).send("Internal Server Error")
    }
    
    
}
module.exports.logout_post = (req, res) =>{
    res.cookie('jwt', null, { maxAge:1});
    console.log("user logout");
    res.send('logout');
}

module.exports.change_password_post = async (req, res) =>{
    var userName = req.body.username;
    var new_pass = req.body.password;

    try{
        const user_who_want_to_update_pass = await  User.findOne({ 
            where:{
                username: userName 
            } 
        });
        if (user_who_want_to_update_pass == null){
            res.status(400).send("user with username "+ userName+ " doesnt exists in DB");
        }
        console.log("[changing pass] user exist and found ! user:", user_who_want_to_update_pass.username);
        await user_who_want_to_update_pass.update({ password: new_pass});
        await user_who_want_to_update_pass.save();
        
        
        res.status(200).send("password updated");
        // https://stackoverflow.com/questions/45314883/hash-password-on-create-and-update
    }catch (err){
        console.log(err);
        res.status(400).status("internal error while updating")
    }
}