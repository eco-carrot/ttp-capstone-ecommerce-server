const Sequelize = require("sequelize");
const db = require("../db");

const Orders = db.define("orders", {
  OrderNo: {type: Sequelize.INTEGER, allowNull: false },
    // FLOAT?
  date: {type: Sequelize.STRING, allowNull: false },
  totalAmount: {type: Sequelize.FLOAT, allowNull: false },
});

module.exports = Orders;