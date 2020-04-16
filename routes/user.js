const router = require('express').Router();
const path = require('path');
const authRoute = require('./auth');

router.use('/auth', authRoute);

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/user_login.html'));
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

router.get('/account', (req, res) => {
    req.user ? res.sendFile(path.join(__dirname, '../views/user_account.html')) : res.redirect('/user/login');
});

module.exports = router;