const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');

const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const logRoute = require('./routes/log');
const goalsRoute = require('./routes/goals');

const app = express();

// static content
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/users', usersRoute);
app.use('/auth', authRoute);
app.use('/log', logRoute);
app.use('/goals', goalsRoute);

// 404
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});

// mongodb connect
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to MongoDB');
});

// passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport').passport

// server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
