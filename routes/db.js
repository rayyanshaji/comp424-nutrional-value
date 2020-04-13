const router = require('express').Router();
const User = require('../models/user');

router.get('/user', (req, res) => {
    if (req.user) {
        User.find({ _id: req.user._id }, (err, results) => {
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

module.exports = router;