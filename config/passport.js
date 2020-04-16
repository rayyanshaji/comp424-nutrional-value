const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/user');

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
        callbackURL: '/user/auth/google/callback',
        scope: 'profile'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ provider: profile.provider, providerID: profile.id }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                new User({
                    provider: profile.provider,
                    providerID: profile.id,
                    name: profile.displayName
                }).save().then((newUser) => {
                    console.log('New user: ', newUser);
                    done(null, newUser);
                });
            } else {
                return done(err, user);
            }
        });
    }
));

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENTID,
        clientSecret: process.env.GITHUB_CLIENTSECRET,
        callbackURL: '/user/auth/github/callback',
        scope: 'profile'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ provider: profile.provider, providerID: profile.id }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                new User({
                    provider: profile.provider,
                    providerID: profile.id,
                    name: profile.displayName
                }).save().then((newUser) => {
                    console.log('New user: ', newUser);
                    done(null, newUser);
                });
            } else {
                return done(err, user);
            }
        });
    }
));

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMERKEY,
    consumerSecret: process.env.TWITTER_CONSUMERSECRET,
    callbackURL: '/user/auth/twitter/callback',
    scope: 'profile'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ provider: profile.provider, providerID: profile.id }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            new User({
                provider: profile.provider,
                providerID: profile.id,
                name: profile.displayName
            }).save().then((newUser) => {
                console.log('New user: ', newUser);
                done(null, newUser);
            });
        } else {
            return done(err, user);
        }
    });
}
));