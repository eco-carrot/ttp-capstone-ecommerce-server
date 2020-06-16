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

/* GET particular item by id */
router.get("/:id", async (req, res, next) => {
  // take the id from params
  const { id } = req.params;
  // query the database for an item with matching id
  try {
    // if successful:
    const item = await Items.findByPk(id);
    // send back the item as a response
    res.status(200).json(item);
  } catch (err) {
    // if error:
    // handle error
    next(err);
  }
});


module.exports = router;