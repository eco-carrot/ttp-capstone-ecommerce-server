var express = require("express");
const stripe = require("stripe")("sk_test_51GwBqvHGbCAGvRQngQvqobJ0DvilaYy36EiYYf9Wo3O2pA0t8RvnW0LQuvLERPzuOMRm9QS1IydIPc9bN5mJYIcg00mMkgI0ut");
var router = express.Router();
const { Orders, OrderItems, Items } = require("../database/models");

const uuid = require("uuid/v4");

router.post("/", async (req, res) => {
    console.log("Request:", req.body);
  
    let error;
    let status;
    try {
      const { product, token } = req.body;
  
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });
  
      const idempotency_key = uuid();
      const charge = await stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Order #${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip
            }
          }
        },
        {
          idempotency_key
        }
      );
      console.log("Charge:", { charge });


      //close the order
      const updatedOrderObj = {
        open: false,
        totalAmount: product.price * 100,
      };

      const order = await Orders.findByPk(product.name);
      
      //reset found order by updated value
      await order.set(updatedOrderObj);
      const updatedOrder = await order.save();
      

      //update stock
      const allOrderItems = await OrderItems.findAll({where: {orderId: product.name}});

       allOrderItems.map(async (currentOrderItem) => {
          console.log({currentOrderItem});
          const currentItem = await Items.findByPk(currentOrderItem.itemId);           
          let updatedItemObj = currentItem;          
          updatedItemObj.quantity -= currentOrderItem.quantity;          
          await currentItem.set(updatedItemObj);
          await currentItem.save();          
      });
        
    
      status = "success";
    } catch (error) {
      console.error("Error:", error);
      status = "failure";
    }
  
    res.json({ error, status });
  });

module.exports = router;
