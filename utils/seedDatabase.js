const { Items } = require("../database/models");

const seedDatabase = async () => {
  await Promise.all([
    Items.create({
      name :"Apple",
      price: 2,
      upc: "0123456",
      quantity: 20,
      categories: "fruit",
      description: "fresh and sweet",
    }),

  ]);
};

module.exports = seedDatabase;
