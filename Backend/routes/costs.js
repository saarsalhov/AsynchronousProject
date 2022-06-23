const express = require('express'),
    router = express.Router();
const dbo = require('../db/conn')


// Hello Costs health check
router.get('/', async function (req, res) {
    console.log('hello costs');
    res.send(JSON.stringify('hello costs'));
    return true;
});

// Add new cost item
router.post('/addCostItem', async function (req, res) {
    const usd = 3.46;
    const eur = 3.63;
    const gbp = 4.23;

    let myDate = new Date(req.body.date);
    let myMonth = myDate.getMonth() + 1;
    let myYear = myDate.getFullYear();
    console.log(myMonth);
    console.log(myYear);


    const dbConnect = await dbo.connectToServer();
    var newCostItem = {
        category: req.body.category,
        description: req.body.description,
        sum: [
            {
                price: parseFloat(req.body.price),
                coin: 'ils'
            },
            {
                price: parseFloat(req.body.price),
                coin: 'usd'
            },
            {
                price: parseFloat(req.body.price),
                coin: 'eur'
            },
            {
                price: parseFloat(req.body.price),
                coin: 'gbp'
            }
        ],
        date: myDate,
        email_address: req.body.email_address
    };

    if (req.body.coin === 'ils') {
        newCostItem.sum[1].price = parseFloat(req.body.price) / usd;
        newCostItem.sum[2].price = parseFloat(req.body.price) / eur;
        newCostItem.sum[3].price = parseFloat(req.body.price) / gbp;
    } else if (req.body.coin === 'usd') {
        newCostItem.sum[0].price = parseFloat(req.body.price) * usd;
        newCostItem.sum[2].price = (parseFloat(req.body.price) * usd) / eur;
        newCostItem.sum[3].price = (parseFloat(req.body.price) * usd) / gbp;
    } else if (req.body.coin === 'eur') {
        newCostItem.sum[0].price = parseFloat(req.body.price) * eur;
        newCostItem.sum[1].price = (parseFloat(req.body.price) * eur) / usd;
        newCostItem.sum[3].price = (parseFloat(req.body.price) * eur) / gbp;
    } else if (req.body.coin === 'gbp') {
        newCostItem.sum[0].price = parseFloat(req.body.price) * gbp;
        newCostItem.sum[1].price = (parseFloat(req.body.price) * gbp) / usd;
        newCostItem.sum[2].price = (parseFloat(req.body.price) * gbp) / eur;
    }


    var newCostByMonthItem = {
        month: myMonth,
        year: myYear,
        total_sum: [
            {
                price: newCostItem.sum[0].price,
                coin: 'ils'
            },
            {
                price: newCostItem.sum[1].price,
                coin: 'usd'
            },
            {
                price: newCostItem.sum[2].price,
                coin: 'eur'
            },
            {
                price: newCostItem.sum[3].price,
                coin: 'gbp'
            }
        ],
        email_address: req.body.email_address
    };

    let myQuery = {email_address: req.body.email_address, month: myMonth, year: myYear};

    dbConnect
        .db('async_course_db')
        .collection('costs')
        .insertOne(newCostItem, function (err, response) {
            if (err) {
                res.status(500).send('Error fetching addCostItem')
            } else {
                console.log('Item added to cost db');
                dbConnect
                    .db('async_course_db')
                    .collection('costs_by_month')
                    .find(myQuery, {projection: {_id: 0}}).limit(1)
                    .toArray(function (err, result) {
                        if (err) {
                            res.status(500).send('Error fetching addCostItem!');
                        } else if (result && result.length) {
                            for (let i = 0; i < newCostItem.sum.length; i++) {
                                result[0].total_sum[i].price = parseFloat(result[0].total_sum[i].price) + parseFloat(newCostItem.sum[i].price);
                            }
                            newValues = {$set: result[0]};
                            dbConnect.db('async_course_db').collection('costs_by_month').updateOne(myQuery, newValues, function (err, res) {
                                if (err) throw err;
                            });
                            res.status(201).send(JSON.stringify({status: 'item added to costs + append to costs by month'}));
                        } else {
                            dbConnect.db('async_course_db').collection('costs_by_month').insertOne(newCostByMonthItem, function (err, res) {
                                if (err) {
                                    throw err;
                                } else {
                                    console.log('item added to costs by month and year');
                                }
                            });
                            res.status(201).send(JSON.stringify({status: 'item added to costs + add to costs by month'}));
                        }
                    });
            }
        });
    dbConnect.close();
});


// filter costs by month ,year and email address
router.get('/reportByMonthAndYear', async function (req, res) {
    let usersMonth = parseInt(req.query.month);
    let usersYear = parseInt(req.query.year);
    let emailAddress = req.query.email;
    const dbConnect = await dbo.connectToServer();

    let allCostsByMonthAndYear = {
        $expr: {$and: [{'$eq': [{'$month': '$date'}, usersMonth]}, {'$eq': [{'$year': '$date'}, usersYear]}]},
        email_address: emailAddress
    };
    let sumOfCostsByMonthAndYear = {email_address: emailAddress, month: usersMonth, year: usersYear};

    dbConnect
        .db('async_course_db')
        .collection('costs')
        .find(allCostsByMonthAndYear, {projection: {_id: 0}})
        .toArray(function (err, firstResult) {
            if (err) {
                res.status(500).send('Error to find all cost item!');
            } else {
                dbConnect
                    .db('async_course_db')
                    .collection('costs_by_month')
                    .find(sumOfCostsByMonthAndYear, {projection: {_id: 0}})
                    .toArray(function (err, secondResult) {
                        if (err) {
                            res.status(500).send('Error to find total sum of all cost items in this month and year!');
                        } else {
                            res.status(200).send(JSON.stringify({
                                message: {
                                    data: firstResult,
                                    totalSum: secondResult
                                }
                            }));
                        }
                    });
            }
        });

    dbConnect.close();
});


// filter costs by email address
router.get('/allMyCosts', async function (req, res) {
    let emailAddress = req.query.email;
    const dbConnect = await dbo.connectToServer();

    let myQuery = {email_address: emailAddress};

    dbConnect
        .db('async_course_db')
        .collection('costs')
        .find(myQuery, {projection: {_id: 0}})
        .toArray(function (err, result) {
            if (err) {
                res.status(500).send('Error to find all cost item!');
            } else {
                res.status(200).send(JSON.stringify({data: result}));
            }
        });

    dbConnect.close();
});


module.exports = router;
