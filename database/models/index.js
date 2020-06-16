// Here, we can prepare to register our models, set up associations between tables, and generate a barrel file for the models;

const Items = require("./items");
const Users = require("./users");
const Orders = require("./orders");

//relations
Users.hasMany(Orders);
Orders.belongsTo(Users);
Orders.hasMany(Items);

module.exports = {
  Items,
  Users,
  Orders
};
