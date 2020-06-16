const Sequelize = require("sequelize");
const db = require("../db");

const Items = db.define("items", {
  name : {type: Sequelize.STRING, allowNull: false },
  price: {type: Sequelize.INTEGER, allowNull: false }, 
  quantity: {type: Sequelize.INTEGER, allowNull: false },
  category: {type: Sequelize.STRING, allowNull: false },
  description: {type: Sequelize.TEXT, allowNull: false },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: "https://via.placeholder.com/480x240?text=Placeholder",
  },
});

module.exports = Items;
