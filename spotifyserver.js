// spotifyserver.js 

const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();

const clientId = "e04cea25e1c64a279bea6ba94dd6cfaa"
const clientSecret = "d16fc8e9f2744fc8be0ef1e38a4a6951"


// Initialize Spotify API library with your credentials
const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
});

// Attempt to retrieve an access token
spotifyApi.clientCredentialsGrant().then(
    data => {
      console.log('Access Token Successfully Retrieved:', data.body['access_token']);
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    err => {
      console.error('Error retrieving Spotify access token:', err);
    }
  );  

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

app.get('/preview', async (req, res) => {
    console.log('Reached /preview route');
    const { title, artist, markets = 'US,GB,CA,AU' } = req.query;
    const marketArray = markets.split(',');
    console.log(`Attempting to fetch preview for: ${title} by ${artist} in markets ${marketArray}`);
  
    try {
      let track = null;
      for (const market of marketArray) {
        const response = await spotifyApi.searchTracks(`track:${title} artist:${artist}`, { market });
        console.log(`Spotify API Response for market ${market}:`, JSON.stringify(response.body, null, 2));
        if (response.body.tracks.items.length > 0) {
          track = response.body.tracks.items[0];
          console.log(`Found track in market ${market}:`, JSON.stringify(track, null, 2));
          break;
        }
      }
  
      if (track) {
        if (track.preview_url) {
          const previewUrl = track.preview_url;
          console.log(`Preview URL: ${previewUrl}`);
          res.json({ previewUrl });
        } else {
          console.log(`No preview URL found for: ${title} by ${artist}`);
          res.status(404).json({ error: 'Preview URL not available' });
        }
      } else {
        console.log(`No tracks found for: ${title} by ${artist} in markets ${marketArray}`);
        res.status(404).json({ error: 'Track not found' });
      }
    } catch (err) {
      console.error(`Error while searching Spotify tracks: ${err.message}`, err);
      res.status(500).json({ error: 'Internal Server Error', details: err });
    }
  });


module.exports = app;
