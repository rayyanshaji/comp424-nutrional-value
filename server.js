const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const logRoute = require('./routes/log');
const goalsRoute = require('./routes/goals');
const accountRoute = require('./routes/account');

const app = express();

// cookie session
app.use(cookieSession({
    keys: [process.env.SESSION_KEY]
}));

// passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport').passport;

// static content
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/log', logRoute);
app.use('/goals', goalsRoute);
app.use('/account', accountRoute);

// 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});

// mongodb connect
const mongodbServer = process.env.MONGODB_URI || 'mongodb://localhost/app'
mongoose.connect(mongodbServer, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log(`Connected to MongoDB at ${mongodbServer}`);
});

// server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
