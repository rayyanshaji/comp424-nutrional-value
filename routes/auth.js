const router = require('express').Router();
const passport = require('passport');
const Log = require('../models/log');

router.get('/google', passport.authenticate('google', { 
    scope: ['profile'] 
}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
    logCollection(req);
});

router.get('/github', passport.authenticate('github', { 
    scope: ['profile'] 
}));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
    logCollection(req);
});

function logCollection(req) {
    Log.countDocuments({ _id: req.user._id }, (err, count) => {
        if (err) return err;
        if (count == 0) {
            new Log({
                user_id: req.user._id
            }).save().then((newLog) => {
                console.log('New user: ', newLog);
            });
        }
    })
}

module.exports = router;