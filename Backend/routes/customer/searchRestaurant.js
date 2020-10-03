var express = require('express');
var router = express.Router();
var mysqlConnection = require('../../models/index')

//Router to handle get request to search restaurants
router.get('/searchforrestaurant', function(req,res) {
    let returnObject = {};
    console.log(req.query)
    let param1 = req.query[0]
    let param2 = req.query[1]
    console.log(req.query[0])
    console.log(param1,param2)
    var sql1 = "select * FROM `restaurant` WHERE restaurantId in (SELECT restaurantId from `menu` where dishName LIKE '" 
    + '%' +param1+ '%' + "' ) OR zipcode ='" 
    + '%' +param2+ '%' + "' OR cuisine LIKE '" 
    + '%' +param1+ '%' + "'";
    mysqlConnection.query(sql1,(err,result)=>{
        if(err) {
            returnObject.message = 'error'
        }
        else{
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
        }
    })

})
module.exports = router;
