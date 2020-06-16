const { Items, Users, Orders } = require("../database/models");

const seedDatabase = async () => {
  await Promise.all([
    Items.create({
      name :"Apple",
      price: 200,      
      quantity: 20,
      category: "fruit",
      description: "fresh and sweet",
    }),
    
    Users.create({
      lastName: "Doe",
      firstName: "Jane",
      email:  "jane.doe@gmail.com",    
      role: "user",
    }),

    Users.create({
      lastName: "Doe",
      firstName: "John",
      email:  "john.doe@aol.com",    
      role: "admin",
    }),

    Orders.create({
      open: true,
      totalAmount: 500,
    })
  ]);
};

module.exports = seedDatabase;
