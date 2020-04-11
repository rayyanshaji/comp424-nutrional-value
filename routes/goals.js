const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    req.user ? res.sendFile(path.join(__dirname, '../views/goals.html')) : res.redirect('/user/login');
});

module.exports = router;