const express = require('express');
const users = require('./routes/users');
const path = require('path');
const db = require('mongoose');

const app = express();

app.use('/users', users);

// static content
app.use(express.static(__dirname + '/public'));

// Routes (temp)
app.get('/log', (req, res) => {
    // req.user ? res.sendFile(path.join(__dirname, '/views/log.html')) : res.redirect('/users/login');
    res.sendFile(path.join(__dirname, '/views/log.html'))
});
app.get('/goals', (req, res) => {
    req.user ? res.send('Goals') : res.redirect('/users/login');
});

// 404
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server started on port ${port}`));