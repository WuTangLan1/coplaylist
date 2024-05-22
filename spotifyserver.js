// spotifyserver.js 

const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const { db } = require('@/components/fbDir/fbInit'); 
const { doc, getDoc, updateDoc } = require('firebase/firestore');

const app = express();
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
});

async function refreshToken(userId) {
  const userDocRef = doc(db, 'profiles', userId);
  const userDoc = await getDoc(userDocRef);
  if (!userDoc.exists()) {
      throw new Error('User not found.');
  }
  const userData = userDoc.data();

  spotifyApi.setRefreshToken(userData.refresh_token);
  const data = await spotifyApi.refreshAccessToken();
  const accessToken = data.body['access_token'];

  await updateDoc(userDocRef, {
      access_token: accessToken,
      expires_at: new Date().getTime() + data.body['expires_in'] * 1000
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
