var express = require('express');
var router = express.Router();

var mysqlConnection = require('../models/index')

var bcrypt = require('bcrypt');
const saltRounds = 10;

const path = require('path');
var multer = require('multer')  

var filepath = "";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        filepath = file.originalname + Date.now() + path.extname(file.originalname)
        cb(null, filepath);
    }
});
var upload = multer({ storage: storage });


//Route to handle Post Request Call for Restaurant Registration
router.post('/restaurantregister', function (req, res) {
    let returnObject = {}
    restaurantname = req.body.restaurantname
    email = req.body.email
    password = req.body.password
    location = req.body.location

    new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(password, salt, (err, encrypted) => {
                if (err) throw err;
                resolve(encrypted)
            })
        })
    })
        .then((value) => {
            var sql1 = "insert into restaurant (restaurantName, email, password, location) values ('" + restaurantname + "', '" + email + "', '" + value + "','" + location + "')";
            mysqlConnection.query(sql1, function (error, result) {
                if (error) {
                    returnObject.message = "error";
                    res.return(returnObject);
                }

                if (result.affectedRows === 1) {
                    returnObject.message = "Registered Successfully";
                    res.json(returnObject);
                }
            });
        })
});

//Route to handle Post Request Call to update basic Restaurant Information
router.post('/restaurantlogin', function (req, res) {
    let returnObject = {};
    email = req.body.email
    password = req.body.password
    var sql2 = "select * from  restaurant where email = '" + email + "'";
    new Promise((resolve, reject) => {
        mysqlConnection.query(sql2, function (error, result) {
            console.log(result[0])
            if (!result[0]) {
                returnObject.message = "nouser";
                res.json(returnObject);
            }
            resolve(result[0])
        });
    })
        .then((value) => {
            new Promise((resolve, reject) => {
                bcrypt.compare(password, value.password, (err, result) => {
                    if (err) throw err;
                    resolve([result, value]);
                })
            })
                .then((value) => {
                    if (value[0]) {
                        returnObject.message = "success";
                        returnObject.data = value[1]
                    }
                    else {
                        returnObject.message = "error"
                    }
                    res.json(returnObject)
                })
        })
});

//Router to handle post request to update restaurant Profile Data
router.post('/restaurantprofileUpdate/:id', function (req, res) {
    let returnObject = {};
    console.log("ID", req.params.id);
    var sql3 = "update restaurant set restaurantImage ='" + req.body.restaurantImage
        + "',restaurantName='" + req.body.restaurantName
        + "',email='" + req.body.email
        + "',description='" + req.body.description
        + "',contact='" + req.body.contact
        + "',location='" + req.body.location
        + "',city='" + req.body.city
        + "',state='" + req.body.state
        + "',country='" + req.body.country
        + "',zipcode='" + req.body.zipcode
        + "',timings='" + req.body.timings
        + "',curbPickup='" + req.body.curbPickup
        + "',dineIn='" + req.body.dineIn
        + "',yelpDelivery ='" + req.body.yelpDelivery
        + "' where restaurantId='" + req.params.id + "'";
    mysqlConnection.query(sql3, (err, result) => {
        console.log("result", result);
        if (err) {
            returnObject.message = "error";
            res.json(returnObject);
        }
        else {
            returnObject.message = "success";
            returnObject.data = result;
            res.json(returnObject);
        }
    });
});

//Router to handle get request to fetch dishes
router.get('/restaurantprofiledetails/:id', function(req,res) {
    let returnObject = {};
    console.log("Inside restaurant profile");
    var sql5 = "select * from  restaurant where restaurantId = '" + req.params.id + "'";
    mysqlConnection.query(sql5,(err,result)=>{
        if(err) {
            returnObject.message = 'error'
        }
        else{
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
            console.log("Profile Data", returnObject)
        }
    })

})

//Router to handle post request to add dishes to Menu
router.post('/updateMenu', upload.single('dishImage1'),function (req, res) {
    let returnObject = {};
    console.log("filepath",filepath)
    if(req.file){
        let sql4 = "insert into menu (restaurantId, dishName, dishIngredients, dishDescription, dishImage1,price,dishCategory) values ('" +
        req.body.restaurantId + "', '" +
        req.body.dishName + "', '" +
        req.body.dishIngredients + "','" +
        req.body.dishDescription + "','" +
        req.file.originalname + "','" +
        // req.file.dishImage2 + "','" +
        // req.file.dishImage3 + "','" +
        // req.file.dishImage4 + "','" +
        req.body.price + "','" +
        req.body.dishCategory + "')";
    mysqlConnection.query(sql4, (err, result) => {
        if (err) {
            returnObject.message = "error";
            res.json(returnObject);
        }
        else {
            returnObject.message = "success";
            returnObject.data = result;
            res.json(returnObject);
        }
    });
    }
});

//Router to handle post request to edit dish from menu
router.put('/editMenu', upload.single('dishImage1'),function (req, res) {
    let returnObject = {};
    // console.log("filepath",filepath)
    // if(req.file){
        var sql4 = "update menu set dishName ='" + req.body.dishName
        + "',dishIngredients ='" + req.body.dishIngredients
        + "',dishDescription ='" + req.body.dishDescription
        // + "',req.file.dishImage1 ='" + req.file.originalname
        // req.file.dishImage2 + "','" +
        // req.file.dishImage3 + "','" +
        // req.file.dishImage4 + "','" +
        + "',price='" + req.body.price
        + "',dishCategory='" + req.body.dishCategory
        + "' where itemID='" + req.body.itemID + "'";
    mysqlConnection.query(sql4, (err, result) => {
        if (err) {
            returnObject.message = "error";
            res.json(returnObject);
        }
        else {
            returnObject.message = "success";
            returnObject.data = result;
            res.json(returnObject);
        }
    });
    // }
});

//Router to handle post request to fetch dishes
router.get('/fetchMenu/:id', function(req,res) {
    let returnObject = {};
    console.log("Inside fetch Menu");
    var sql5 = "select * from  menu where restaurantId = '" + req.params.id + "'";
    mysqlConnection.query(sql5,(err,result)=>{
        if(err) {
            returnObject.message = 'error'
        }
        else{
            returnObject.message = "success"
            returnObject.data = result
            res.json(returnObject)
            console.log("Menu Data",returnObject)
        }
    })

})

//Router to handle post request to fetch dish to edit or delete
router.get('/fetchdish/:id', function(req,res) {
    console.log("Inside edit dish");
    let returnObject = {};
    console.log("ID", req.params.id);
    var sql8 = "select * from  menu where itemID = '" + req.params.id + "'";
    mysqlConnection.query(sql8,(err,result)=>{
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

//Router to handle delete request for a dish
router.delete('/deleteMenu/:id', function(req,res) {
    let returnObject = {};
    console.log("Inside deleting dish")
    console.log("ID", req.params.id);
    var sql7 = "delete from  menu where itemID = '" + req.params.id + "'";
    mysqlConnection.query(sql7,(err,result)=>{
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