// spotifyserver.js 

const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });
  
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
    console.log(`Searching for: ${title} by ${artist}`);
    try {
      const data = await spotifyApi.searchTracks(`track:${title} artist:${artist}`);
      console.log(JSON.stringify(data.body.tracks.items, null, 2));  // Detailed log of track items
      const tracks = data.body.tracks.items;
      if (tracks.length > 0 && tracks[0].preview_url) {
        const previewUrl = tracks[0].preview_url;
        console.log(`Found preview URL: ${previewUrl}`);
        res.json({ previewUrl });
      } else {
        console.log(`No preview URL available for: ${title} by ${artist}`);
        res.status(404).json({ error: 'Preview URL not available' });
      }
    } catch (err) {
      console.error(`Error searching for track: ${title} by ${artist}`, err);
      res.status(500).json({ error: 'Internal Server Error', details: err });
    }
});


module.exports = app;