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
  try {
    const data = await spotifyApi.searchTracks(`track:${title} artist:${artist}`);
    const tracks = data.body.tracks.items;
    if (tracks.length > 0) {
      const previewUrl = tracks[0].preview_url;
      res.json({ previewUrl });
    } else {
      res.json({ previewUrl: null });
    }
  } catch (err) {
    console.error('Error searching for track:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = app;