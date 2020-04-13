const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { 
    scope: ['profile'] 
}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    /**
     * @todo: Redirect to previous page
     */
    res.redirect('/');
});

router.get('/github', passport.authenticate('github', { 
    scope: ['profile'] 
}));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    /**
     * @todo: Redirect to previous page
     */
    res.redirect('/');
});

module.exports = router;