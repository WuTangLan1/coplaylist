// spotifyserver.js 

const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();

// Spotify API credentials
const clientId = 'e04cea25e1c64a279bea6ba94dd6cfaa';  // Replace with your client ID
const clientSecret = 'd16fc8e9f2744fc8be0ef1e38a4a6951';  // Replace with your client secret

const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant().then(
  data => {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  err => {
    console.error('Something went wrong when retrieving an access token', err);
  }
);

app.get('/preview', async (req, res) => {
    const { title, artist } = req.query;
    console.log('Received preview request for:', title, artist);
    try {
      const data = await spotifyApi.searchTracks(`track:${title} artist:${artist}`);
      const tracks = data.body.tracks.items;
      if (tracks.length > 0 && tracks[0].preview_url) {
        const previewUrl = tracks[0].preview_url;
        console.log('Sending preview URL:', previewUrl);
        res.json({ previewUrl });
      } else {
        console.log('No preview URL available for:', title, artist);
        res.status(404).json({ error: 'Preview URL not available' });
      }
    } catch (err) {
      console.error('Error searching for track:', err);
      console.error('Spotify API error response:', err.body);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



module.exports = app;