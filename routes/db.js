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

router.get('/log/:date', (req, res) => {
    if (req.user) {
        Log.findOne({ user_id: req.user._id, 'days.date': req.params.date}, (err, results) => {
            if (!err) {
                res.json(results)
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
    Log.findOneAndUpdate({ user_id: '5e94b89e6bfbaf05d24058ca' }, {$push: {
        days: [
            {
              date: req.params.date
            }
          ]
    }}, function (err, result) { 
        if (err) res.status(400).json('400');
        else res.json(result);
    })
}

function addItem(req, res) {
    Log.findOne({ user_id: '5e94b89e6bfbaf05d24058ca', 'days.date': req.params.date}, (err, results) => {
        if (err) res.status(400).json('400');
        if (!results) {
            addDate(req, res);
            addItem(req, res);
        } else {
            Log.findOneAndUpdate({ user_id: '5e94b89e6bfbaf05d24058ca', 'days.date': req.params.date }, {$push: {
                'days.$.items': {
                    'meal': 'breakfast',
                    'name': 'pizza'
                }
            }}, function (err, result) { 
                if (err) res.status(400).json('400');
                else res.json(result);
            })
        }
    })
}

module.exports = router;