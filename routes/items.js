var express = require("express");
var router = express.Router();
const { Items } = require("../database/models");

/* GET all items. */
router.get("/", async (req, res, next) => {
  try {
    const items = await Items.findAll();
    console.log(items);
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
});

module.exports = router;