const Sequelize = require("sequelize");
const db = require("../db");

const Items = db.define("items", {
  name : {type: Sequelize.STRING, allowNull: false },
  price: {type: Sequelize.FLOAT, allowNull: false },
    // FLOAT?
  upc: {type: Sequelize.STRING, allowNull: false, unique: true },
  quantity: {type: Sequelize.INTEGER, allowNull: false },
  categories: {type: Sequelize.STRING, allowNull: false },
  description: {type: Sequelize.STRING, allowNull: false },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: "https://via.placeholder.com/480x240?text=Placeholder",
  },
});

module.exports = Items;
