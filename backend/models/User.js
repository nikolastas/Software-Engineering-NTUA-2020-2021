
const bcrypt = require("bcryptjs");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type:Sequelize.STRING, 
        validate:{
          not:{
            args: /[_.]/,
            msg: "[username] Must NOT contain '_' or '.'"
          },
          is:{args:/[a-zA-Z0-9._]/, msg:"[username value] should contain at minimum at least 4 letters "},
          len:  {
            args: [4,40],
            msg: "[username length] Must NOT be less than 4 and Must NOT be greater than 40"
          },
        },
        allowNull: false, 
        primaryKey: true
      },
      password: {
        type:Sequelize.STRING,
        validate:{
          len:  {
            args: [8,40],
            msg: "[password length] Must NOT be less than 8 and Must NOT be greater than 40"
          },
          is:{
            args:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
            msg: "[password value] should contain at minimum at least one letter and one number"
        }
      },
        
        allowNull: false
      },
      typeofuser:{
        
        type:Sequelize.STRING,
        validate:{
          equals: {args:'user', msg:"[typeofuser] must be either admin or user"},
          equals:{args: "admin", msg:"[typeofuser] must be either admin or user"}
        },
        allowNull: false
      },
      email:{
        type:Sequelize.STRING,
        validate:{
          isEmail:{args:true, msg:"[email] must be a valid email address"},
        },
        allowNull:true
      }
    }, 
      {
        hooks:{
          beforeCreate: async (user) => {
            
            if (user.password) {
              
             const salt = await bcrypt.genSalt();
             user.password = bcrypt.hashSync(user.password, salt);
             console.log(user.password);
            }
           },
           beforeUpdate:async (user) => {
            if (user.password) {
             const salt = await bcrypt.genSaltSync(10, 'a');
             user.password = bcrypt.hashSync(user.password, salt);
            }
           }
          },
          instanceMethods: {
           validPassword: (password) => {
            return bcrypt.compareSync(password, this.password);
           }
         
        },
      timestamps: false
    }
  );
  
    return User;
  };