<template>
  <div>
    Exporting your playlist to Spotify...
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      error: null
    };
  },
  created() {
    const token = this.$route.query.token;
    const userId = this.$route.query.user_id; // Make sure this is correctly extracted
    if (token && userId) {
      console.log("Received token and user ID:", token, userId);
      this.createSpotifyPlaylist(token, userId);
    } else {
      this.error = "Failed to receive Spotify authentication token or user ID.";
    }
  },
  methods: {
    async createSpotifyPlaylist(playlistName, songs, accessToken, userId) {
      const playlistDetails = {
        name: playlistName, 
        description: 'Created from CoPlaylist',
        public: false
      };

      try {
        const createPlaylistResponse = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, playlistDetails, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        const playlistId = createPlaylistResponse.data.id;
        const trackUris = songs.map(song => song.previewUrl).filter(url => url); // assuming previewUrl is the Spotify track URI

        if (trackUris.length > 0) {
          await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            uris: trackUris
          }, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });
        }

        console.log('Playlist created:', createPlaylistResponse.data);
      } catch (error) {
        console.error('Failed to create playlist:', error);
        this.error = 'Failed to create playlist.';
      }
    }
  }
}
</script>
