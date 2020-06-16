const Sequelize = require("sequelize");
const db = require("../db");

const Orders = db.define("orders", {    
  open: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true},
  totalAmount: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0},
});

module.exports = Orders;