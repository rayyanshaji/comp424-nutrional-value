const router = require('express').Router();
const path = require('path');

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/users_login.html'));
});

router.get('/register', (req, res) => {
    res.send('Register');
});

router.get('/logout', (req, res) => {
    res.send('Log out');
});

module.exports = router;