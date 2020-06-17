var express = require("express");
var router = express.Router();
const { Items, Orders, OrderItems } = require("../database/models");

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
  