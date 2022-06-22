const express = require('express'), router = express.Router();
const dbo = require('../db/conn');
const jwt = require('jsonwebtoken');

router.get('/', async function (req, res) {
    res.send(JSON.stringify('hello users'));
    return true;
});

// create new user
router.post('/signup', async function (req, res) {
    const dbConnect = await dbo.connectToServer();
    const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: req.body.birthday,
        email_address: req.body.email_address,
        marital_status: req.body.marital_status,
        gender: req.body.gender,
        password: req.body.password
    };

    dbConnect
        .db('async_course_db')
        .collection('users')
        .find({'email_address': req.body.email_address}).limit(1)
        .toArray(function (err, result) {
            if (err) {
                res.status(500).send('Error fetching listings!');
            } else if (result && result.length) {
                res.status(400).send('user already exist');
            } else {
                dbConnect.db('async_course_db').collection('users').insertOne(newUser, function (err, res) {
                    if (err) {
                        throw err;
                    } else {
                        console.log('user created successfully');
                    }
                });
                res.status(201).send(JSON.stringify({status: 'user created successfully!'}));
            }
        });
    await dbConnect.close();
});


// sign in
router.post('/signin', async function (req, res) {
    const dbConnect = await dbo.connectToServer();

    dbConnect.db('async_course_db').collection('users')
        .find({'email_address': req.body.email_address, 'password': req.body.password}).limit(1)
        .toArray(function (err, result) {
            if (err) {
                res.status(500).send('Error fetching listings!');
            } else if (!(result && result.length)) {
                res.status(404).send('user not exist');
            } else {
                const token = jwt.sign({
                    username: req.body.email_address,
                    name: result[0].first_name
                }, 'verySecretValue', {expiresIn: '1h'})
                res.status(200).json({
                    message: 'Login successful!', token, first_name: result[0].first_name
                })
            }
        });
    await dbConnect.close();
});


module.exports = router;
