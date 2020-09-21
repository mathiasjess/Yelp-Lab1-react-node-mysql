var express = require('express');
var router = express.Router();

var mysqlConnection = require('../models/index')

var bcrypt = require('bcrypt');
const saltRounds = 10;

var restaurantUser = {}

//Route to handle Post Request Call for Restaurant Registration
router.post('/restaurantregister', function (req, res) {
    let returnObject = {}
    restaurantname = req.body.restaurantname
    email = req.body.email
    password = req.body.password
    location = req.body.location

    new Promise((resolve,reject)=>{
        bcrypt.genSalt(saltRounds,(err,salt)=>{
            if (err) throw err;
            bcrypt.hash(password, salt, (err, encrypted)=>{
                if(err) throw err;
                resolve(encrypted)
            })
        })
    })
    .then((value)=>{
        var sql1 =  "insert into restaurant (restaurantName, email, password, location) values ('" + restaurantname + "', '" + email + "', '" + value + "','" + location + "')";
        mysqlConnection.query(sql1, function (error, result) {
            if (error){
                returnObject.message = "error";
                res.return(returnObject);
            }
            
            if(result.affectedRows === 1){
                returnObject.message = "Registered Successfully";
                res.json(returnObject);
            }
         });
    } )
});

//Route to handle Post Request Call to update basic Restaurant Information
router.post('/restaurantlogin', function (req, res) {
    let returnObject = {};
    email = req.body.email
    password = req.body.password
    console.log("email", email);
    console.log("password",password);
    var sql2 =  "select * from  restaurant where email = '" + email + "'";
    new Promise((resolve,reject)=>{
        mysqlConnection.query(sql2, function (error, result) {
            console.log(result[0])
            if(!result[0]){
                returnObject.message = "nouser";
                console.log('Invalid user');
                res.json(returnObject);
            }
            resolve(result[0])
        });
    })
    .then((value)=>{
        new Promise((resolve,reject)=>{
            bcrypt.compare(password,value.password,(err,result)=>{
                if (err) throw err;
                console.log("Password matched")
                resolve([result,value]);
            })
        })
        .then((value)=>{
            if(value[0]){
                returnObject.message = "success";
                returnObject.data = value[1]
            }
            else{
                console.log("Invalid credentials")
                returnObject.message = "error"
            }
            console.log(returnObject)
            res.json(returnObject)
        })
    })
});

//Router to handle get request for restaurant Profile Data
router.get('/restaurantProfileData/:id', function (req, res) {
    let returnObject = {};
    id = req.params.id
    console.log(req.params)
    console.log("Returning data for get restaurant Profile")
    let sql3 =  "select * from  restaurant where restaurantId = '" + id + "'";
    new Promise((resolve,reject)=>{
        mysqlConnection.query(sql3, function (error, result) {
            if(error){
                returnObject.message = "error"
                res.json(returnObject);
            }
            else{
                returnObject.message = "success"
                returnObject.data = result;
                res.json(returnObject);
            }
    })
    })
});



module.exports =router;