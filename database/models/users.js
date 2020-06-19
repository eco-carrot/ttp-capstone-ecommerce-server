const Sequelize = require("sequelize");
const db = require("../db");
const crypto = require("crypto");
const sequelize = require("sequelize");


const Users = db.define("users", {
  lastName: { type: Sequelize.STRING, allowNull: false },
  firstName: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, validate: {isEmail: true}, unique:true },    
  role: { type: Sequelize.STRING, allowNull: false }, 
  password: {type: Sequelize.STRING, allowNull: false},   
  salt: { type: sequelize.STRING, get(){
    return () => this.getDataValue("salt")
  }},
  googleId: { type: Sequelize.STRING},
  imageUrl: {
    type: Sequelize.STRING,
  
    defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRRWAjTO9sDIgksF8zbkTZ7rjZqqwJmYqKEJhcemmfYkwFn3kkz&usqp=CAU",
  },
});

User.generateSalt = function() {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

const setSaltAndPassword = user => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);


module.exports = Users;
