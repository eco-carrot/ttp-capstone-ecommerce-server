// Here, we can prepare to register our models, set up associations between tables, and generate a barrel file for the models;

const Items = require("./items");
const Users = require("./users");
const Orders = require("./orders");
const OrderItems = require("./order_items");

//relations
Users.hasMany(Orders);
Orders.belongsTo(Users);
Orders.belongsToMany(Items, {through: OrderItems});
Items.belongsToMany(Orders, {through: OrderItems});

module.exports = {
  Items,
  Users,
  Orders,
  OrderItems
};
