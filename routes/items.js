var express = require("express");
var router = express.Router();
const { Items } = require("../database/models");

/* GET all items. */
router.get("/", async (req, res, next) => {
  try {
    const items = await Items.findAll();    
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


// Route to handle add items
// /api/items/
router.post("/", async (req, res, next) => {
  // Take the form data from the request body
  const { name, price, quantity, category, description, imageURL} = req.body;
  // Create an item object
  const itemObj = {
    name: name,    
    price: price,
    quantity: quantity,
    category: category,
    description: description,
    imageURL: imageURL
  };
  try {
    // Create a new student on the database
    const newItem = await Items.create(itemObj);
    // The database would return an item
    // send that item as a json to the client
    res.status(201).send(newItem);
  } catch (err) {
    next(err);
  }
});


router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const updatedObj = { ...req.body };
  try {
    const item = await Items.findByPk(id);
    await item.set(updatedObj);
    const updatedItem = await item.save();
    res.status(201).send(updatedItem);
  } catch (err) {
    next(err);
  }
});

// Route to handle removing an item
// /api/items/:id
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  // get an id for a item to delete
  try {
    // pass the id to the database to find item to be deleted
    // database would either respond succcess or fail
    const item = await Items.findByPk(id);
    // invoke the .destroy() method on the returned item
    await item.destroy();
    // send a success message to the client
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});


module.exports = router;