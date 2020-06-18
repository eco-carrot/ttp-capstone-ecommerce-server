var express = require("express");
var router = express.Router();
const { Items, OrderItems,} = require("../database/models");
const Orders = require("../database/models/orders");

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

router.get("/:id", async (req, res, next) => {
    // try to get OrderItems for a specific order from database   
    try {
      // OrderItems will be the result of the OrderItems.findAll promise
      const allOrderItems = await OrderItems.findAll({where: 
        {orderId: req.params.id}});
      // if OrderItems is valid, it will be sent as a json response
      
      res.status(200).json(allOrderItems);
    } catch (err) {
      // if there is an error, it'll passed via the next parameter to the error handler middleware
      next(err);
    }
  });

// Route to handle adding a OrderItem
// /api/order_items/
router.post("/", async (req, res, next) => {
    // Take the form data from the request body    
    const { quantity, orderId, itemId} = req.body;
   
    // Create a OrderItem object
    try{        
        const item = await Items.findByPk(itemId);
        const iPrice = item.price;
         const orderItemObj = {
            quantity: quantity,
            price: iPrice,           
            orderId: orderId,
            itemId: itemId,
    };
            // Create a new OrderItem on the database
        const newOrderItem = await OrderItems.create(orderItemObj);
        // The database would return a OrderItem
        // send that OrderItem as a json to the client
        res.status(201).send(newOrderItem);
    }
    catch (err){
        next(err);
    }   
   
  });


router.put("/:id/:itemID", async (req, res, next) => {
    // get the id from request params    
    const { id, itemID} = req.params;
    // get form data from the request body
    const { quantity } = req.body;
    
    //try ro find, update, and send data for a specific OrderItems object
    try {         
      //get a current price for the Item associated with this OrderItems object
      const item = await Items.findByPk(itemID);
      const iPrice = item.price;      

      //store the data needed for the update in an object
      const updatedObj = {
          quantity: quantity,    
          price: iPrice 
        }; 
        
    //Find and update OrderItem with a matching id (orderId) and itemId from the database
      const orderItem = await OrderItems.update(
          {
            quantity: updatedObj.quantity,
            price: updatedObj.price 
          },
          {
            where: {orderId: id,
            itemId: itemID}
        });
      
      //find the updated object, convert it to JSON, and save data as updatedOrderItem
      const updatedOrderItem = await OrderItems.findAll(
          {
            where: {orderId: id,
                itemId: itemID},
            raw: true
          }
      );     
     
      // send the new OrderItem as a response from the API
      res.status(201).send(updatedOrderItem);
    } catch (err) {
      // if error:
      // handle the error
      next(err);
    }
  });

// Route to handle removing OrderItem
// /api/order_items/:id/:itemID
router.delete("/:id/:itemID", async (req, res, next) => {
    const { id, itemID } = req.params;
       
    // get an id and itemID for a OrderItem to delete
    try {
      // pass the id and itemID to the database to find OrderItem 
      //and delete it
      await OrderItems.destroy({
        where: {orderId: id,
        itemId: itemID}
        });
      // send a success message to the client
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  });


  //delete ALL OrderItems associated with the order (id)
  router.delete("/:id", async (req, res, next) => {    
    // get an id for a OrderItems to delete
    const { id } = req.params;
    try {
      // pass the id (orderId) and itemId to the database to find OrderItem 
      //and delete it
      await OrderItems.destroy({
        where: {orderId: id,
        }
        });
      // send a success message to the client
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  });

  
  module.exports = router;
  