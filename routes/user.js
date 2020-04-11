const router = require('express').Router();
const path = require('path');

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/user_login.html'));
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

router.get('/setup', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/user_setup.html'));
});

router.get('/test', (req, res) => {
    res.send(req.user.isSetup);
});

module.exports = router;