var express = require("express");
var router = express.Router();
const { Orders, OrderItems, Items } = require("../database/models");


/* GET Order History for a user */
// /api/userHistory
router.post("/", async (req, res, next) => {

    const { userId } = req.body;

    console.log(userId);

    try {

        const paidOrders = await Orders.findAll( {where:
        {
            userId: userId,
            open: false
        }});

        let allOrdersWithItems = [];        

        const orderHistoryPromise = await paidOrders.map( async (order) => {

            const orderItemsCurrentOrder = await OrderItems.findAll({where: 
                {orderId: order.id}});
            
            

            const currentOrderItemsPromises = await orderItemsCurrentOrder.map(async (currentOrderItem) => {
                const currentItem = await Items.findOne( {where: 
                {
                    id: currentOrderItem.itemId
                }});

                const historyItemObj = {
                    id: currentItem.id,
                    name: currentItem.name,
                    unitsSold: currentOrderItem.quantity,
                    price: currentOrderItem.price,
                    totalAmount: (currentOrderItem.price*currentOrderItem.quantity),
                    category: currentItem.category,
                    description: currentItem.description,
                    imageURL: currentItem.imageURL
                }
                
                return historyItemObj;                
            })

            let tryThis;

            const currentOrderPromsie = Promise.all(currentOrderItemsPromises).then( (ItemsFromPromise) => {
                orderFromP = {
                    orderId: order.id,
                    paidDate: order.updatedAt,
                    totalOrderAmount: order.totalAmount,
                    itemsInOrder: ItemsFromPromise
                };                
                return orderFromP;
            });
            
            

            currentOrderPromsie.then((orderFromPromise) => {         
                allOrdersWithItems.push(orderFromPromise);
                      
                return orderFromPromise;
            })
            
            return currentOrderPromsie;
        });

        Promise.all(orderHistoryPromise).then( (finalResult) => {
             
            res.status(200).json(finalResult);
        });
        
    
      // include orders in order if found, it will be sent as a json response
      //res.status(200).json(finalResult);
    } catch (err) {
      next(err);
    }
  });
  

module.exports = router;
