// server.js
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');
const axios = require('axios');
const session = require('express-session');
const passport = require('./passport-setup');

const app = express();

const corsOptions = {
  origin: ['https://coplaylist-3481ef838394.herokuapp.com', 'https://coplaylist.com', 'https://www.coplaylist.com', 'http://localhost:3000', 'http://localhost:8080'],
  credentials: true,
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', serveStatic(path.join(__dirname, '/dist')));

app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });


app.use(session({
  secret: '1c4d8b9f-351c-4bc2-8626-c883ba47d443',  
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }  
}));

app.use(passport.initialize());
app.use(passport.session());


const spotifyServer = require('./spotifyserver.js');
app.use('/spotify', spotifyServer);


app.get('/auth/spotify/export', (req, res, next) => {
  next();
}, passport.authenticate('spotify', {
  scope: ['playlist-modify-public', 'playlist-modify-private'],
  showDialog: true 
}));

app.get('/auth/spotify/login', (req, res, next) => {
  const authOptions = {
    scope: ['playlist-modify-public', 'playlist-modify-private', 'playlist-read-private', 'playlist-read-collaborative'],
    showDialog: true,
    state: 'fetch-playlists' 
  };
  passport.authenticate('spotify', authOptions)(req, res, next);
});

app.get('/auth/spotify/login-fetch', (req, res, next) => {
  const authOptions = {
    scope: ['playlist-read-private', 'playlist-read-collaborative'],
    showDialog: true,
    state: 'fetch-playlists'  
  };
  passport.authenticate('spotify', authOptions)(req, res, next);
});

app.get('/callback-fetch', passport.authenticate('spotify', { failureRedirect: '/' }), (req, res) => {
  const redirectBaseUrl = process.env.NODE_ENV === 'production' ? 'https://www.coplaylist.com' : 'http://localhost:8080';
  res.redirect(`${redirectBaseUrl}/improve-playlist?token=${req.user.accessToken}`);
});

app.get('/callback', passport.authenticate('spotify', { failureRedirect: '/' }), (req, res) => {

  const { state, code } = req.query;

  if (req.user && req.user.accessToken && req.user.profile) {
      const redirectBaseUrl = process.env.NODE_ENV === 'production' ? 'https://www.coplaylist.com' : 'http://localhost:8080';
      if (state === 'fetch-playlists') {
          console.log('Redirecting to fetch playlists');
          res.redirect(`${redirectBaseUrl}/improve-playlist?token=${req.user.accessToken}`);
      } else {
          console.log('Redirecting to export playlists');
          const playlistId = req.query.playlist_id || 'undefined';
          const playlistName = req.query.playlist_name || 'undefined';
          res.redirect(`${redirectBaseUrl}/export-success?token=${req.user.accessToken}&user_id=${req.user.profile.id}&playlist_id=${playlistId}&playlist_name=${encodeURIComponent(playlistName)}`);
      }
  } else {
      console.error("Failed to get access token.");
      const redirectBaseUrl = process.env.NODE_ENV === 'production' ? 'https://www.coplaylist.com' : 'http://localhost:8080';
      res.redirect(`${redirectBaseUrl}/export-failure`);
  }
});



app.post('/generate-playlist', async (req, res) => {
    const { vibes, tones = {}, songs, userTaste ={}, excludeSongs= [] } = req.body;
    const exclusionString = excludeSongs.length > 0 ? `Please ensure that none of the following songs are used in the result these songs: ${excludeSongs.join(', ')}` : '';

    const genres = Array.isArray(tones.genres) ? tones.genres.join(', ') : 'Not specified';
    const eras = Array.isArray(tones.eras) ? tones.eras.join(', ') : 'Not specified';
    const favouriteStyles = typeof userTaste.favouriteArtists === 'string'
        ? userTaste.favouriteArtists.split(', ').filter(Boolean)
        : userTaste.favouriteArtists;

    const dislikedArtists = typeof userTaste.dislikedArtists === 'string'
        ? userTaste.dislikedArtists.split(', ').filter(Boolean)
        : userTaste.dislikedArtists;

    if (!vibes || !songs) {
        return res.status(400).send("Vibes or songs data are missing in the request");
    }

    const prompt = `
        Generate a playlist of between 8-13 (PLEASE VARY THIS LENGTH AND ALWAYS ATTEMPT TO GENERATE DIFFERENT LENGTHED PLAYLISTS (which must adhere to the following structure : "song title - artist name : release year") 
        that must adhere to the following playlist guides to create a wonderful and inspiring playlist that will also impress the 
        user with how accurate and responsive to their input it is :  
        Generate a playlist that must adhere to the following playlist guides:
        Genres: (CRITICAL) Ensure the genre(s) are the genres that the songs generated are from: ${genres},
        Eras: Ensure the songs are from these eras: ${eras},
        User Taste: Influenced by the styles of ${favouriteStyles},
        Mood: ${vibes.selectedMood || 'any'},
        Activity: ${vibes.selectedActivity || 'any'},
        Familiarity: ${vibes.selectedFamiliarity || 'any'},
        Setting: ${vibes.selectedSetting || 'any'},
        Songs: Influenced by these but not included: ${songs.map(song => `${song.name} by ${song.artist} `).join(', ')},
        Exclude these artists under any circumstances: ${dislikedArtists},
        And please exclude the following songs under all circumstances and these represent songs the user does not want generated again ${exclusionString},
        Generate 5 additional alternative songs using the same criteria.
        
        Here is an example of a playlist that would be generated, please can you ensure that you strictly adhere to this format when generating
        a playlist :
        A Team - Ed Sheeran: 2011
        Can't Stop the Feeling! - Justin Timberlake: 2016
        Happy - Pharrell Williams: 2013
        Shake It Off - Taylor Swift: 2014
        Uptown Funk - Mark Ronson ft. Bruno Mars: 2014
        Stronger (What Doesn’t Kill You) - Kelly Clarkson: 2011
        Roar - Katy Perry: 2013
        Titanium - David Guetta ft. Sia: 2011
        Eye of the Tiger - Survivor: 1982
        Don't Stop Me Now - Queen: 1978

        Extra Songs:
        Rolling in the Deep - Adele: 2010
        Get Lucky - Daft Punk ft. Pharrell Williams: 2013
        Firework - Katy Perry: 2010
        Locked Out of Heaven - Bruno Mars: 2012
        Livin' on a Prayer - Bon Jovi: 1986

        please note the structure of the above to be achieved and ensure that no additional information is posted, and above all else, please ensure the user inputs are achieved.
        PLEASE DO NOT ADD NUMBERING TO THE LIST OF SONGS YOU GENERATE
        It of the utmost importantce the following two steps are adhered to so please check the outputted playlist to ensure this was achieved :

        Exclude these artists under any circumstances: ${dislikedArtists},
        ONCE AGAIN I WOULD LIKE TO REITERATE THAT I DO NOT WANT THE PLAYLIST TO HAVE SONGS FROM ANY OF THESE ARTISTS :  ${dislikedArtists}
        `;

        

        console.log('prompt in server :   ', prompt)

    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4-turbo", 
            messages: [
                { role: "system", content: "You are an expert in music and creating song music playlists for users based on their requests." },
                { role: "user", content: prompt.trim() }
            ]
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        const data = response.data;
        const songs = data.choices[0].message.content.split('\n').slice(0, -5); 
        const alternativeSongs = data.choices[0].message.content.split('\n').slice(-5); 
        res.json({songs, alternativeSongs});
    } catch (error) {
        console.error('Error generating playlist:', error);
        res.status(error.response ? error.response.status : 500).send('Failed to generate playlist');
    }
});

app.get('/google123456789abcd.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/google123456789abcd.html'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
