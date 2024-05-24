// passport-setup.js
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.use(new SpotifyStrategy({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/callback"
},
function(accessToken, refreshToken, expires_in, profile, done) {
  console.log("Spotify login successful", profile);
  // Include the access token in the user object
  done(null, { profile: profile, accessToken: accessToken, refreshToken: refreshToken, expires_in: expires_in });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});


module.exports = passport;

