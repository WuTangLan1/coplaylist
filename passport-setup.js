// passport-setup.js
require('dotenv').config();
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

const callbackURL = process.env.NODE_ENV === 'production' ? 'https://www.coplaylist.com/callback' : 'http://localhost:3000/callback';

passport.use(new SpotifyStrategy({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: callbackURL 
},
function(accessToken, refreshToken, expires_in, profile, done) {
  done(null, { profile: profile, accessToken: accessToken, refreshToken: refreshToken, expires_in: expires_in });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
