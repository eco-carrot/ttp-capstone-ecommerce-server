const Sequelize = require("sequelize");
const db = require("../db");

const Users = db.define("users", {
  Name: { type: Sequelize.STRING, allowNull: false },
  loginEmail: { type: Sequelize.STRING, allowNull: false, validate: {isEmail: true}, unique:true },
  DOB: { type: Sequelize.STRING, allowNull: false},
  billingAddress: { type: Sequelize.STRING, allowNull: false },
  shippingAddress: { type: Sequelize.STRING, allowNull: false },
  // creditcards?
  type: { type: Sequelize.STRING, allowNull: false },
    // Admin/Customer
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRRWAjTO9sDIgksF8zbkTZ7rjZqqwJmYqKEJhcemmfYkwFn3kkz&usqp=CAU",
  },
});

module.exports = Users;
