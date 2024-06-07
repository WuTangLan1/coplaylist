// spotifyserver.js 

const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
});

async function refreshSpotifyToken() {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    const accessToken = data.body['access_token'];
    spotifyApi.setAccessToken(accessToken);
  } catch (err) {
    console.error('Error refreshing Spotify access token:', err);
  }
}

refreshSpotifyToken();
setInterval(refreshSpotifyToken, 3600 * 1000); 

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

  app.get('/user-playlists', async (req, res) => {
    if (!req.user || !req.user.accessToken) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }
    try {
      spotifyApi.setAccessToken(req.user.accessToken);
      const data = await spotifyApi.getUserPlaylists({ limit: 50 });
      res.json({ playlists: data.body.items });
    } catch (error) {
      console.error('Failed to fetch user playlists:', error);
      res.status(500).json({ error: 'Failed to fetch playlists' });
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


module.exports = app;
