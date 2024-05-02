// spotifyserver.js 

const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

// Replace with your Spotify app credentials
const clientId = 'e04cea25e1c64a279bea6ba94dd6cfaa';
const clientSecret = 'd16fc8e9f2744fc8be0ef1e38a4a6951';

const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant().then(
  (data) => {
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  (err) => {
    console.error('Error retrieving access token:', err);
  }
);

app.get('/preview', async (req, res) => {
    const { title, artist } = req.query;
    console.log('Received preview request for:', title, artist);
    try {
      // ... (existing code)
      console.log('Sending preview URL:', previewUrl);
      res.json({ previewUrl });
    } catch (err) {
      console.error('Error searching for track:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = app;