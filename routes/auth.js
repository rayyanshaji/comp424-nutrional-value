const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { 
    scope: ['profile'] 
}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    /**
     * @todo: Go back to page redirected from
     */
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/users/login');
});

module.exports = router;