var express = require("express");
var router = express.Router();
const { Items, OrderItems } = require("../database/models");

router.get("/", async (req, res, next) => {
    // try to get OrderItems object from database
    try {
      // OrderItems will be the result of the OrderItems.findAll promise
      const allOrderItems = await OrderItems.findAll();
      // if OrderItems is valid, it will be sent as a json response
      console.log(allOrderItems);
      res.status(200).json(allOrderItems);
    } catch (err) {
      // if there is an error, it'll passed via the next parameter to the error handler middleware
      next(err);
    }
  });

// Route to handle adding a OrderItem
// /api/orders/
router.post("/", async (req, res, next) => {
    // Take the form data from the request body    
    const { quantity, orderId, itemId} = req.body;
   
    // Create a campus object
    try{        
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


router.put("/", async (req, res, next) => {
    // get the id from request params
    //const { orderId, itemId } = req.params;
    // get form data from the request body
    const { orderId, itemId, quantity } = req.body;
    
    try {
      // if successfull:
      // Find a OrderItem with a matching id from the database
      console.log(itemId + " " + orderId + " " + quantity);
      const item = await Items.findByPk(itemId);
      const iPrice = item.price;
      console.log(item);

      const updatedObj = {
          quantity: quantity,    
          price: iPrice  
        };      

      const orderItem = await OrderItems.findByPk(orderId);
      // database would return a valid OrderItem object or an error
      console.log(updatedObj);
      // modify the OrderItem object with new form data
      await orderItem.set(updatedObj);
      // save the new OrderItem object to the data
      // database would return a new OrderItem object
      const updatedOrderItem = await orderItem.save();
      console.log(updatedOrderItem);
      // send the new OrderItem as a response from the API
      res.status(201).send(updatedOrderItem);
    } catch (err) {
      // if error:
      // handle the error
      next(err);
    }
  });

  
  module.exports = router;
  