var express = require('express');
var router = express.Router();
var mysqlConnection = require('../../models/index')

var bcrypt = require('bcrypt');
const saltRounds = 10;

// Route to handle Post Request Call for customer Registration
router.post('/customerregister', function (req, res) {
    username = req.body.username
    email = req.body.email
    password = req.body.password

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
            var sql1 =  "insert into customer (username, email, password) values ('" + username + "', '" + email + "', '" + password + "')";
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


    
    mysqlConnection.query(sql1, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
    });

});

//Route to handle Post Request Call for customer login
router.post('/restaurantlogin', function (req, res) {
    let returnObject = {};
    email = req.body.email
    password = req.body.password
    var sql2 =  "select id from  customer where email = '" + email + "' and  password = '" + password + "'";
    new Promise((resolve, reject) => {
        mysqlConnection.query(sql2, function (error, result) {
            console.log(result[0])
            if (!result[0]) {
                returnObject.message = "nouser";
                console.log('Invalid user');
                res.json(returnObject);
            }
            resolve(result[0])
        });
    })
        .then((value) => {
            new Promise((resolve, reject) => {
                bcrypt.compare(password, value.password, (err, result) => {
                    if (err) throw err;
                    console.log("Password matched")
                    resolve([result, value]);
                })
            })
                .then((value) => {
                    if (value[0]) {
                        returnObject.message = "success";
                        returnObject.data = value[1]
                    }
                    else {
                        console.log("Invalid credentials")
                        returnObject.message = "error"
                    }
                    res.json(returnObject)
                })
        })
});
