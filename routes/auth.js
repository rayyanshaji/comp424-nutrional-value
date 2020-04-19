const router = require('express').Router();
const passport = require('passport');
const Log = require('../models/log');
const LogWeight = require('../models/goals');

router.get('/google', passport.authenticate('google', { 
    scope: ['profile'] 
}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/user/login' }), (req, res) => {
    res.redirect('/');
    logCollection(req);
});

router.get('/github', passport.authenticate('github', { 
    scope: ['profile'] 
}));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/user/login' }), (req, res) => {
    res.redirect('/');
    logCollection(req);
});

router.get('/twitter', passport.authenticate('twitter', { 
    scope: ['profile'] 
}));

router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/user/login' }), (req, res) => {
    res.redirect('/');
    logCollection(req);
});

function logCollection(req) {
    Log.countDocuments({ user_id: req.user._id }, (err, count) => {
        if (err) return err;
        if (count == 0) {
            new Log({
                user_id: req.user._id
            }).save().then((newLog) => {
                console.log('New log: ', newLog);
            });
        }
    })
}

function logWeights(req){
    LogWeight.countDocuments({ user_id: req.user._id }, (err, count) => {
        if (err) return err;
        if (count == 0) {
            new LogWeight({
                user_id: req.user._id
            }).save().then((newLog) => {
                console.log('New weight: ', newLog);
            });
        }
    })
}

module.exports = router;