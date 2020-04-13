const router = require('express').Router();
const User = require('../models/user');
const Item = require('../models/item');

router.get('/user', (req, res) => {
    if (req.user) {
        User.find({ _id: req.user._id }, (err, results) => {
            if (!err) {
                res.json(results[0]);
            } else {
                res.status(401).send('401');
            }
        })
    } else {
        res.status(401).send('401');
    }
})

router.get('/food_log', (req, res) => {
    if (req.user) {
        User.find({ _id: req.user._id }, 'food_log', (err, results) => {
            if (!err) {
                res.json(results[0].food_log)
            } else {
                res.status(401).send('401');
            }
        })
    } else {
        res.status(401).send('401');
    }
})

router.post('/food_log', (req, res) => {
    var newItem = new Item({
        meal: 'breakfast',
        dateAdded: new Date(),
        name: 'pizza',
        type: 'common'
    })
    newItem.save((err, result) => {
        if (err) {
            console.log('err')
        } else {
            Item.find({}, function (error, result) { 
                res.json(result);
            })
        }
    })
})

module.exports = router;