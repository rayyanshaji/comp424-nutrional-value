const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    var date = new Date();
    res.redirect('/log/' + date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate());
});

router.get('/:date', (req, res) => {
    if (req.user) {
        res.sendFile(path.join(__dirname, '../views/log.html'));
    } else {
        res.redirect('/user/login');
    }

});

module.exports = router;