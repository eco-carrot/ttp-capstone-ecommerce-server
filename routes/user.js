var express = require("express");
var router = express.Router();
const { Users, Orders } = require("../database/models");

/* GET all Users */
// /api/user
router.get("/", async (req, res, next) => {
  try {
    const users = await Users.findAll();
    // include users in user if found, it will be sent as a json response
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});


// /api/user/:id retrieve json per user
router.get("/:id", async (req, res, next) => {
  // take the userId from params
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id);
    res.status(200).json(user);
    // send back json for particular uesr
  } catch (err) {
    next(err);
  }
});

router.get("/:id/orders", async (req, res, next) => {
  // take the userId from params
  const { id } = req.params;
  try {
    const orders = await Orders.findAll({where: 
      {userId: req.params.id}});
    res.status(200).json(orders);
    // send back json for particular uesr
  } catch (err) {
    next(err);
  }
});

router.get("/:id/orders/open", async (req, res, next) => {
  // take the userId from params
  const { id } = req.params;
  
  try {
    const existingOpenOrder = await Orders.findOne({where: 
      {userId: req.params.id,
      open: true}});

    if(existingOpenOrder){
      res.status(200).json(existingOpenOrder);
    }
    else{
      const newOrderObj = {
        open: true,
        totalAmount: 0,
        userId: req.params.id
      };
      const newOrder = await Orders.create(newOrderObj);
      res.status(201).send(newOrder);
    }
    
    // send back json for particular uesr
  } catch (err) {
    next(err);
  }
});

// Post request for Adding an User
// /api/user/
router.post("/", async (req, res, next) => {
  // Take the form data from the request body
  const { lastName, firstName, email, role } = req.body;
  // Create a campus object
  const userObj = {
    lastName: lastName,
    firstName: firstName,
    email: email,    
    role: role,  
  };
  try {
    const newUser = await Users.create(userObj);
    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
});

// Put request to edit user with :id
// /api/user/:id
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { lastName, firstName, email, role } = req.body;
  const updatedUserObj = {
    lastName: lastName,
    firstName: firstName,
    email: email,    
    role: role,  
  };
  try {
    // find user by key
    const user = await Users.findByPk(id);
    console.log(updatedUserObj)
    //reset found user by updated value
    await user.set(updatedUserObj);
    const updatedUser = await user.save();
    // send the updated values as a response from the API
    res.status(201).send(updatedUser);
  } catch (err) {
    next(err);
  }
});

// delete by user id
// /api/user/:id
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    //find user with params id
    const user = await Users.findByPk(id);
    await user.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
