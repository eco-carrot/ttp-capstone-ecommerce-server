const Sequelize = require("sequelize");
const db = require("../db");

const Users = db.define("users", {
  lastName: { type: Sequelize.STRING, allowNull: false },
  firstName: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, validate: {isEmail: true}, unique:true },    
  role: { type: Sequelize.STRING, allowNull: false },    
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRRWAjTO9sDIgksF8zbkTZ7rjZqqwJmYqKEJhcemmfYkwFn3kkz&usqp=CAU",
  },
});

module.exports = Users;
