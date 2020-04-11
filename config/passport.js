const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userSchema');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENTSECRET,
        callbackURL: '/auth/google/callback',
        scope: 'profile'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ providerID: profile.id }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                new User({
                    dateCreated: new Date(),
                    provider: profile.provider,
                    providerID: profile.id,
                    name: profile.displayName
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            } else {
                return done(err, user);
            }
        });
    }
));