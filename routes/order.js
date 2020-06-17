var express = require("express");
var router = express.Router();
const { Orders } = require("../database/models");

/* GET all Orders */
// /api/order
router.get("/", async (req, res, next) => {
  try {
    const orders = await Orders.findAll();
    // include orders in order if found, it will be sent as a json response
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});


// /api/order/:id retrieve json per order
router.get("/:id", async (req, res, next) => {
  // take the orderId from params
  const { id } = req.params;
  try {
    const order = await Orders.findByPk(id);
    // include items in list
    res.status(200).json(order);
    // send back view per order, including OrderItems
  } catch (err) {
    next(err);
  }
});

// Post request for Adding an Order
// /api/order/
router.post("/", async (req, res, next) => {
  // Take the form data from the request body
  const { open, totalAmount } = req.body;
  // Create a campus object
  const orderObj = {
    open:open,
    totalAmount:totalAmount,
  };
  try {
    const newOrder = await Orders.create(orderObj);
    res.status(201).send(newOrder);
  } catch (err) {
    next(err);
  }
});

// Put request to edit order with :id
// /api/order/:id
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { open, totalAmount } = req.body;
  const updatedOrderObj = {
    open: open,
    totalAmount: totalAmount,
  };
  try {
    // find order by key
    const order = await Orders.findByPk(id);
    console.log(updatedOrderObj)
    //reset found order by updated value
    await order.set(updatedOrderObj);
    const updatedOrder = await order.save();
    // send the updated values as a response from the API
    res.status(201).send(updatedOrder);
  } catch (err) {
    next(err);
  }
});

// delete by order id
// /api/order/:id
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    //find order with params id
    const order = await Orders.findByPk(id);
    await order.destroy();
    // respond 204 success
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
