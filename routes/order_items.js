var express = require("express");
var router = express.Router();
const { Items, OrderItems } = require("../database/models");

router.get("/", async (req, res, next) => {
    // try to get campuses object from database
    try {
      // campuses will be the result of the Campus.findAll promise
      const allOrderItems = await OrderItems.findAll();
      // if campuses is valid, it will be sent as a json response
      console.log(allOrderItems);
      res.status(200).json(allOrderItems);
    } catch (err) {
      // if there is an error, it'll passed via the next parameter to the error handler middleware
      next(err);
    }
  });

// Route to handle adding a campus
// /api/campuses/
router.post("/", async (req, res, next) => {
    // Take the form data from the request body    
    const { quantity, orderId, itemId} = req.body;
   
    // Create a campus object
    try{
        console.log(itemId);
        const item = await Items.findByPk(itemId);
        const iPrice = item.price;
         const orderItemObj = {
            quantity: quantity,
            price: iPrice,           
            orderId: orderId,
            itemId: itemId,
    };
            // Create a new campus on the database
        const newOrderItem = await OrderItems.create(orderItemObj);
        // The database would return a campus
        // send that campus as a json to the client
        res.status(201).send(newOrderItem);
    }
    catch (err){
        next(err);
    }   
   
  });
/*
router.put("/:id", async (req, res, next) => {
    // get the id from request params
    const { id } = req.params;
    // get form data from the request body
    const { quantity, orderID, itemID } = req.body;
    const updatedObj = {
        quantity: quantity,
        orderID: orderID,
        itemID: itemID
    };
    try {
      // if successfull:
      // Find a campus with a matching id from the database
      const order = await Orders.findByPk(orderID);
      const item = await Item.findByPk(itemID);

      const orderItem = await OrderItems.findByPk(id, { 
          include: order,
          include: item
    });
      // database would return a valid campus object or an error
      console.log(updatedObj);
      // modify the campus object with new form data
      await orderItem.set(updatedObj);
      // save the new campus object to the data
      // database would return a new campus object
      const updatedOrderItem = await orderItem.save();
      console.log(updatedOrderItem);
      // send the newCampus as a response from the API
      res.status(201).send(updatedOrderItem);
    } catch (err) {
      // if error:
      // handle the error
      next(err);
    }
  });
  */
  module.exports = router;
  