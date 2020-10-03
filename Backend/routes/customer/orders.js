var express = require('express');
var router = express.Router();
var mysqlConnection = require('../../models/index')

router.post('/sendorderdetails/:id', function (req, res) {
    let returnObject = {};
    console.log("Inside send order details");
    console.log("Req body", req.body)
    mysqlConnection.query(
        'INSERT INTO orderdetails (orderID, itemID,dishName,price, quantity) VALUES ?',
        [req.body.map(item => [req.params.id, item.itemID, item.dishName, item.price, item.quantity])],
        (err, results) => {
            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = results
                res.json(returnObject)
            }
        }
    );
})

router.post('/sendordersummary', function (req, res) {
    let orderID = Math.floor(Math.random() * 10000) + 1;  
    let returnObject = {};
    console.log(orderID)
    console.log("Inside Order summary details");
    let sql1 = "INSERT INTO ordersummary (orderID, restaurantId, customerId, totalPrice, deliveryOption, delivery_status, deliveryFilter) VALUES (" + orderID
        + "," + req.body.restaurantID
        + "," + req.body.customerID
        + "," + req.body.total_price
        + ",'" + req.body.delivery_option
        + "','" + req.body.delivery_status
        + "','" + req.body.deliveryFilter + "' )";
        mysqlConnection.query(sql1,(err, results) => {
            if (err) {
                returnObject.message = 'error'
            }
            else {
                returnObject.message = "success"
                returnObject.data = orderID
                res.json(returnObject)
            }
        })
})


module.exports = router;