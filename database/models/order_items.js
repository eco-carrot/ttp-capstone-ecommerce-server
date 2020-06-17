const Sequelize = require("sequelize");
const db = require("../db");

const OrderItems = db.define("order_items", {    
  quantity: {type: Sequelize.INTEGER, allowNull: false },
  price: {type: Sequelize.INTEGER, allowNull: false, min: 1 }
});

module.exports = OrderItems;