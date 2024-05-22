// spotifyserver.js 

const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const { db } = require('./src/components/fbDir/fbInit');
const { doc, getDoc, updateDoc } = require('firebase/firestore');

const app = express();
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
});

app.get('/login', (req, res) => {
  var scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];
  var state = 'some-state-of-my-choice';
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  res.redirect(authorizeURL);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token, expires_in } = data.body;

    // Assume req.user.uid is available from a session or cookie already set
    const userId = req.user.uid; // Make sure this aligns with your auth strategy

    const userDocRef = doc(db, 'profiles', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error('User not found.');
    }

    // Update or set the refresh_token, access_token, and expires_at in the user's Firestore document
    await updateDoc(userDocRef, {
      access_token: access_token,
      refresh_token: refresh_token,
      expires_at: new Date().getTime() + expires_in * 1000 // expires_in is in seconds
    });

    res.redirect('/success'); // Redirect to another page or back to your client
  } catch (err) {
    console.error('Authentication error:', err);
    res.redirect('/error'); // Error handling
  }
});


async function refreshToken(userId) {
  const userDocRef = doc(db, 'profiles', userId);
  const userDoc = await getDoc(userDocRef);
  if (!userDoc.exists()) {
    throw new Error('User not found.');
  }
  const userData = userDoc.data();

  if (!userData.refresh_token || userData.refresh_token === "") {
    throw new Error("No refresh token stored");
  }

  spotifyApi.setRefreshToken(userData.refresh_token);
  const data = await spotifyApi.refreshAccessToken();
  const accessToken = data.body['access_token'];

  // Update the access token and possibly refresh token in Firestore if provided by Spotify
  await updateDoc(userDocRef, {
    access_token: accessToken,
    expires_at: new Date().getTime() + data.body['expires_in'] * 1000,
    refresh_token: data.body['refresh_token'] ? data.body['refresh_token'] : userData.refresh_token
  });

  return accessToken;
}




app.use(async (req, res, next) => {
  if (!req.user || !req.user.uid) {
      return res.status(401).json({ error: 'User not authenticated' });
  }
  try {
      const accessToken = await refreshToken(req.user.uid);
      spotifyApi.setAccessToken(accessToken);
      next();
  } catch (error) {
      console.error('Token refresh failed:', error);
      res.status(500).json({ error: 'Failed to refresh Spotify token' });
  }
});



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

  app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:8080', 'https://coplaylist.com', 'https://www.coplaylist.com'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  

app.use((req, res, next) => {
    next();
});

app.get('/preview', async (req, res) => {
    const { title, artist, markets = 'US,CA,MX,BR,AR,CL,CO,PE,ES,PT,IE,GB,FR,BE,NL,DE,IT,SE,NO,DK,FI,AU,NZ,JP,TW,PH,HK,SG,MY,ID' } = req.query;
    const marketArray = markets.split(',');
  
    try {
      let track = null;
      for (const market of marketArray) {
        const response = await spotifyApi.searchTracks(`track:${title} artist:${artist}`, { market });
        if (response.body.tracks.items.length > 0) {
          track = response.body.tracks.items[0];
          break;
        }
      }
  
      if (track) {
        if (track.preview_url) {
          const previewUrl = track.preview_url;
          res.json({ previewUrl });
        } else {
          res.status(404).json({ error: 'Preview URL not available' });
        }
      } else {
        res.status(404).json({ error: 'Track not found' });
      }
    } catch (err) {
      console.error(`Error while searching Spotify tracks: ${err.message}`, err);
      res.status(500).json({ error: 'Internal Server Error', details: err });
    }
  });

  app.get('/search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).send('Query parameter is required');
    }
    try {
        const result = await spotifyApi.searchTracks(query);
        res.json(result.body);
    } catch (error) {
        console.error('Spotify search error:', error);
        res.status(500).send('Failed to fetch data from Spotify');
    }
});

app.post('/create-playlist', async (req, res) => {
  const { playlistDetails, token } = req.body;
  spotifyApi.setAccessToken(token);

  try {
      const createPlaylistResponse = await spotifyApi.createPlaylist(req.user.id, "New Playlist", { public: false });
      const playlistId = createPlaylistResponse.body.id;

      const trackUris = playlistDetails.map(song => `spotify:track:${song.spotifyId}`);
      await spotifyApi.addTracksToPlaylist(playlistId, trackUris);

      res.send({ message: 'Playlist created successfully', playlistId });
  } catch (error) {
      console.error('Error creating playlist on Spotify:', error);
      res.status(500).json({ error: 'Failed to create playlist on Spotify' });
  }
});



module.exports = app;
