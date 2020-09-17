var express = require('express');
var router = express.Router();

var restaurant = [{
    restaurantname : "",
    username : "",
    email : "",
    password : "",
    location : ""
}]

//Route to handle Post Request Call for Restaurant Registration
router.post('/restaurantregister', function (req, res) {
    let createrestaurantFlag = 0
    console.log("Inside Customer Registration Post Request");
    console.log("Req Body : ", req.body);
    restaurant.map((restrnt) => {
        if (restrnt.email === req.body.email) {
            createrestaurantFlag = 1
            return;
        }
    })
    if (createrestaurantFlag == 0) {
        restaurant.push(req.body)
        console.log("After pushing", restaurant)
        // res.writeHead(200,{
        //     'Content-Type' : 'text/plain' 
        // })
        res.status(200).send({ msg: "Successfully registered a user" })
    }
    else {
        return res.status(400).send({ msg: 'Email already exists. Please login if existing user' });
    }


});

//Route to handle Post Request Call for customer Login
router.post('/restaurantlogin', function (req, res) {
    let loginFlag = 0
    console.log("Inside Customer Registration Post Request");
    console.log("Req Body : ", req.body);
    restaurant.filter((restrnt) => {
        if (restrnt.email === req.body.email && restrnt.password === req.body.password) {
            loginFlag = 1
            res.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
            req.session.user = user;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
        }
        res.end("Successful Login");
    })
    // if (loginFlag == 0) {
    //     return res.status(400).send({ msg: 'Invalid Credentials' });
    // }

});


module.exports =router;