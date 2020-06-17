var express = require("express");
var router = express.Router();

const itemsRouter = require("./items");
const ordersItemsRouter = require("./order_items")
const order = require("./order")

router.use("/items", itemsRouter);
router.use("/order_items", ordersItemsRouter);
router.use("/order", order);

// Error handling middleware;
router.use((req, res, next) => {
  const error = new Error("Not Found, Please Check URL!");
  error.status = 404;
  next(error);
});

// Export our apiRouter, so that it can be used by our main app in app.js;
module.exports = router;
