const { Items, Users, Orders } = require("../database/models");

const seedDatabase = async () => {
  await Promise.all([
    Items.create({
      name :"Apple",
      price: 200,      
      quantity: 20,
      category: "fruit",
      description: "fresh and sweet",
      imageURL: "https://i2.wp.com/ceklog.kindel.com/wp-content/uploads/2013/02/firefox_2018-07-10_07-50-11.png"
    }),

    Items.create({
      name :"Peach",
      price: 300,      
      quantity: 7,
      category: "fruit",
      description: "sweet and juicy",
      imageURL: "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/pdwatercolorfruitbatch1-841-gloy-1b.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=8eacf8b32b6e679f8630c46c51a1ea89"
    }),

    Items.create({
      name :"Tomato",
      price: 150,      
      quantity: 25,
      category: "vegetable",
      description: "organic tomato",
      imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTWoM3bV33EF1XYHIs1GdP7ELCROKkRFB40G8yYRZcNxYqK0U7j&usqp=CAU"
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
