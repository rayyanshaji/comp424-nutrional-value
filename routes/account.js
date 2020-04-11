const router = require('express').Router();

router.get('/', (req, res) => {
    res.user ? res.send('account') : res.redirect('/user/login')
});

module.exports = router;