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
    async createSpotifyPlaylist(accessToken, userId) {
        const playlistDetails = {
          name: 'New Playlist', 
          description: 'Created from CoPlaylist',
          public: false
        };

        console.log("Attempting to create a playlist with User ID:", userId);

        try {
          const response = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, playlistDetails, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });

          console.log('Playlist created:', response.data);
        } catch (error) {
          console.error('Failed to create playlist:', error);
          console.error('Error data:', error.response.data);
        }
      }
  }
}
</script>
