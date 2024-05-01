require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');
const axios = require('axios');
const SpotifyWebApi = require('spotify-web-api-node');

// Create an instance of Express
const app = express();

const redirectUris = {
  development: 'http://localhost:3000/callback',
  production: 'https://www.coplaylist.com/output',
  staging: 'https://yourstagingurl.com/callback'
};

// Use the correct URI based on NODE_ENV
const currentEnvironment = process.env.NODE_ENV || 'development';
const currentRedirectUri = redirectUris[currentEnvironment];

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: currentRedirectUri
});

// Redirect to Spotify login
app.get('/login', (req, res) => {
  const scopes = ['user-read-private', 'user-read-email', 'streaming'];
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, 'state-of-auth');
  res.redirect(authorizeURL);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
    res.redirect('/#'); 
  } catch (error) {
    console.error('Error during Spotify authentication:', error);
    res.redirect('/#/error'); // Redirect on error
  }
});


app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
});


const allowedOrigins = [
    'http://localhost:8080',
    'https://coplaylist-3481ef838394.herokuapp.com',
    'https://coplaylist.com',
    'https://www.coplaylist.com'
  ];

  const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'OPTIONS']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', serveStatic(path.join(__dirname, '/dist')));


app.get('/google123456789abcd.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/google123456789abcd.html'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

async function refreshAccessToken() {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    spotifyApi.setAccessToken(response.data.access_token);
    console.log('Access token refreshed successfully');
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}

async function getSpotifyPreviewUrls(songs) {
    try {
      await refreshAccessToken();
      const data = await spotifyApi.refreshAccessToken();
      spotifyApi.setAccessToken(data.body['access_token']);
      console.log('The access token has been refreshed!');
    } catch (error) {
      console.error('Could not refresh the access token', error);
      return [];
    }
  }

  try {
    const trackSearchQuery = songs.map(song => `track:${song.name} artist:${song.artist}`).join(" OR ");
    const tracksResponse = await spotifyApi.searchTracks(trackSearchQuery);
    return tracksResponse.body.tracks.items.map(track => ({
      name: track.name,
      artist: track.artists.map(artist => artist.name).join(", "),
      preview_url: track.preview_url || "Preview unavailable",
      id: track.id
    }));
  } catch (error) {
    console.error('Spotify API Error:', error);
    return [];
  }


app.post('/generate-playlist', async (req, res) => {
    console.log(req.body); // Logging the entire body to debug
    const { vibes, tones, songs, userTaste, excludeSongs = [] } = req.body;
    const exclusionString = excludeSongs.length > 0 ? `Exclude these songs: ${excludeSongs.join(', ')}` : '';

    const genres = tones && tones.selectedGenres ? tones.selectedGenres.join(', ') : 'Not specified';
    const eras = tones && tones.selectedEra ? tones.selectedEra.join(', ') : 'Not specified';

    if (!vibes || !songs) {
        return res.status(400).send("Vibes or songs data are missing in the request");
    }

    const prompt = `
        Generate a playlist of between 8-13 songs with a playlist name (which must adhere to the following structure : "song title - artist name : release year") 
        that must adhere to the following playlist guides to create a wonderful and inspiring playlist that will also impress the 
        user with how accurate and responsive to their input it is :  
        User Taste (This defines the user and hence has a lot of value in generating the playlist): ${userTaste},
        Mood (please ensure the songs you submit all achieve the following mood) IMPORTANT : PLEASE CAN YOU ENSURE THE GENRE(S) THAT FOLLOW HEAVILY INFLUENCE THE PLAYLIST AND PLEASE ENSURE THE SONGS GENERATED ARE DIRECTLY ASSOSCIATED TO THE FOLLOWING INPUTED GENRE(S): ${vibes.selectedMood || 'any'},
        Activity (please ensure the songs you submit all achieve the following activity): ${vibes.selectedActivity || 'any'},
        Familiarity (please can you ensure that the playlist yopu generate and the songs generated have the following level of fame/knownness): ${vibes.selectedFamiliarity || 'any'},
        Setting (please ensure the songs you submit all achieve the following settign): ${vibes.selectedSetting || 'any'},
        Platform (please ensure the songs are available on the following selected platform): ${vibes.selectedPlatform || 'any platform'},
        Genres (please ensure the songs you submit are from the following genre(s) ): ${genres},
        Eras :IT IS OF THE UTMOST IMPORTANCE THAT THE SONGS YOU GENERATE ARE FROM THE FOLLOWING ERAS : ${eras} PLEASE PLEASE PLEASE CAN YOU BE PRECISE ABOUT THIS AND IF THE USER HAS SPECIFIED ERAS PLEASE FOLLOW THEIR SPECIFICATIONS !!!,
        Songs (please ensure the songs are influenced by these songs BUT ARE NOT THESE SONGS): ${songs.map(song => song.name && song.artist ? `${song.name} by ${song.artist} with a influence weighting of ${song.influence}` : 'Not specified').join(', ')},
        ${exclusionString},
        Here is an example of a playlist that would be generated, please can you ensure that you strictly adhere to this format when generating
        a playlist :
        Playlist Name : Alpha Grooving
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
        please note the structure of the above to be achieved and ensure that no additional information is posted, and above all else, please ensure the user inputs are achieved.
        PLEASE DO NOT ADD NUMBERING TO THE LIST OF SONGS YOU GENERATE`;

    console.log('prompt being sent : ', prompt)
    console.log('Using OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Available' : 'Not Available');

    try {
      const openAiResponse = await axios.post("https://api.openai.com/v1/chat/completions", {
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

      const parsedSongs = songs.map(song => ({ name: song.name, artist: song.artist })); // Adapt based on actual data structure
      const spotifyPreviews = await getSpotifyPreviewUrls(parsedSongs);

      res.json({
          playlist: openAiResponse.data.choices[0].message.content,
          previews: spotifyPreviews
      });

  } catch (error) {
      console.error('Error generating playlist:', error);
      res.status(error.response ? error.response.status : 500).send('Failed to generate playlist');
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
