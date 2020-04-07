const router = require('express').Router();

router.get('/', (req, res) => {
    req.user ? res.send('Goals') : res.redirect('/users/login');
});

module.exports = router;