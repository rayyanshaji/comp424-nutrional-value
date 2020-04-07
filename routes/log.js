const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    // req.user ? res.sendFile(path.join(__dirname, '/views/log.html')) : res.redirect('/users/login');
    res.sendFile(path.join(__dirname, '../views/log.html'))
});

module.exports = router;