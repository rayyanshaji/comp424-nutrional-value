const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");

const userRoute = require('./routes/user');
const logRoute = require('./routes/log');
const goalsRoute = require('./routes/goals');
const dbRoute = require('./routes/db');

const app = express();

// cookie session
app.use(cookieSession({
    keys: [process.env.SESSION_KEY]
}));

app.use(bodyParser.urlencoded({ extended: false }));

// passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport').passport;

// static content
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/user', userRoute);
app.use('/log', logRoute);
app.use('/goals', goalsRoute);
app.use('/db', dbRoute);

// 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});

// mongodb connect
const mongodbServer = process.env.MONGODB_URI || 'mongodb://localhost/app'
mongoose.connect(mongodbServer, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    (!err) ? console.log(`Connected to MongoDB at ${mongodbServer}`) : console.log('Connection to MongoDB failed');
});

// server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
