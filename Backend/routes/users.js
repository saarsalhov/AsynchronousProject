const express = require("express"),
    router = express.Router();
// const bcrypt = require("bcryptjs");
const general = require("../db/conn")


// Hello World health check
router.get("/", async function (req, res) {
    console.log("hello world");
    res.send(JSON.stringify("hello world"));
    return true;
});

// create new user
router.post("/signup", async function (req, res) {
    const dbConnect = general.getDb();
    console.log(
        "req: " + req.body.first_name,
        req.body.last_name,
        req.body.birthday,
        req.body.email_address,
        req.body.marital_status,
        req.body.gender,
        req.body.password
    );

    let checkUser = new Promise((resolve, reject) => {
        console.log("start search promis");
        dbConnect.collection("users").find({ "email_address": req.body.email_address }, { $exists: true }).toArray(async function (err, result) {
            console.log("start if"+ result);
            if (err) {
                console.log("Error fetching users!");
                reject("Error fetching users!");
            } else if (result && result.length) {
                console.log("user exist:" + result);
                reject("user exist");
            } else {
                console.log("user not exist, create it!");
                resolve();
            }
        });
    });

    checkUser.then(function () {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday: req.body.birthday,
            email_address: req.body.email_address,
            marital_status: req.body.marital_status,
            gender: req.body.gender,
            password: req.body.password
        };
        dbConnect.collection("users").insertOne(newUser, function (err, res) {
            if (err) throw err;
            console.log("user created successfully");
            res.send(JSON.stringify({ status: "user created successfully!"}));
        });
    }).catch(function () {
        res.send(JSON.stringify({ status: "User already exist!" }));
    });

});



module.exports = router;
