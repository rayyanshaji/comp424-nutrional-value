const router = require('express').Router();
const User = require('../models/user');
const Log = require('../models/log');

router.get('/user', (req, res) => {
    if (req.user) {
        User.findOne({ _id: req.user._id }, (err, results) => {
            if (!err) {
                res.json(results);
            } else {
                res.status(401).send('401');
            }
        })
    } else {
        res.status(401).send('401');
    }
})

router.get('/log', (req, res) => {
    if (req.user) {
        Log.findOne({ user_id: req.user._id }, (err, results) => {
            if (!err) {
                res.json(results.days)
            } else {
                res.status(401).send('401');
            }
        })
    } else {
        res.status(401).send('401');
    }
})


router.post('/log/:date', (req, res) => {
    addDate(req, res);
})

router.post('/log/:date/add', (req, res) => {
    addItem(req, res);
})

function addDate(req, res) {
    Log.findOneAndUpdate({ user_id: req.user._id }, {$push: {
        days: [
            {
              date: req.params.date
            }
          ]
    }}, function (err) { 
        if (err) res.status(400).json('400');
    })
}

function addItem(req, res) {
    Log.findOne({ user_id: req.user._id, 'days.date': req.params.date}, (err, results) => {
        if (err) res.status(400).json('400');
        if (!results) {
            addDate(req, res);
            addItem(req, res);
        } else {
            Log.updateOne({ user_id: req.user._id, 'days.date': req.params.date }, {$push: {
                'days.$.items': req.body
            }}, function (err) { 
                if (err) res.status(400).json('400');
            })
        }
    })
}

module.exports = router;