const GoogleStrategy = require('passport-google-oauth2').Strategy;
const keys = require('../config/keys');
const passport = require('passport');
const User = require('../models/userModel');
const { authentication: { google } } = keys;

passport.serializeUser(async (user, done) => {
    //note , this is the mongo id for the user 
    console.log('intercepted by the serilizer')
    //TODO JWT should probably be generated here
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('intercepted by the de-serilizer')
    const user = await User.findById(id);
    done(null, user);
});



passport.use(new GoogleStrategy({
    clientID: google.clientID,
    clientSecret: google.clientSercet,
    callbackURL: "http://localhost:8000/auth/google/callback",
    passReqToCallback: true
},
    async function (req, accessToken, refreshToken, profile, done) {
        console.log('passport call back fired', profile);
        const user = await User.findOne({
            googleId: profile.id
        }).exec();
        if (user) {
            console.log('found the user', user);
            //calls the next step which is the serilizer 
            done(null, user)
        } else {
            new User({
                username: profile.displayName,
                googleId: profile.id,
                email: profile.email
            }).save().then((newUSer) => {
                console.log('user created');
                done(null, newUSer);
            });
        }


    }
));

exports.module = passport;