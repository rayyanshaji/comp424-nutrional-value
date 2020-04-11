const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { 
    scope: ['profile'] 
}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    !req.user.name ? res.redirect('/user/setup') : res.redirect('/');
});

module.exports = router;