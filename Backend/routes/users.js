const express = require("express"),
    router = express.Router();
const dbo = require("../db/conn")



// Hello World health check
router.get("/", async function (req, res) {
    console.log("hello world");
    res.send(JSON.stringify("hello world"));
    return true;
});

// create new user
router.post("/signup", async function (req, res) {
    const dbConnect = await dbo.connectToServer();
    var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: req.body.birthday,
        email_address: req.body.email_address,
        marital_status: req.body.marital_status,
        gender: req.body.gender,
        password: req.body.password
    };

    dbConnect
    .db("async_course_db")
    .collection("users")
    .find({"email_address": req.body.email_address}).limit(1)
    .toArray(function (err, result) {
        console.log(result);
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else if (result && result.length) {
        res.status(401).send("user already exist");
      } else {
        dbConnect.db("async_course_db").collection("users").insertOne(newUser, function (err, res) {
            if (err){ throw err;}
            else {
                console.log("user created successfully");
            }
        });
        res.status(200).send(JSON.stringify({ status: "user created successfully!" }));
      }
    });
    dbConnect.close();
});



router.get("/listings", async function (req, res) {
    const dbConnect = await dbo.connectToServer();
    dbConnect
      .collection("users")
      .find({}).limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
       } else {
          res.json(result);
        }
      });
  });



module.exports = router;
