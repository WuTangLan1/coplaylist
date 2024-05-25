<!-- // In exportSuccess.vue -->
<script>
import axios from 'axios';

export default {
  data() {
    return {
      error: null,
      success: false,
      creating: true, // Indicate that creation is in progress
    };
  },
  created() {
    const { token, user_id } = this.$route.query;
    if (token && user_id) {
        const trackDetails = JSON.parse(sessionStorage.getItem('trackDetails'));
        const playlistName = JSON.parse(sessionStorage.getItem('playlistName'));
        sessionStorage.removeItem('trackDetails');
        sessionStorage.removeItem('playlistName');
        if (playlistName && trackDetails) {
            this.createSpotifyPlaylist(token, user_id, decodeURIComponent(playlistName), trackDetails);
        } else {
            this.error = "No track details or playlist name available.";
            this.creating = false;
        }
    } else {
        this.error = "Failed to receive all necessary parameters.";
        this.creating = false;
    }
  },
  methods: {
    async searchTrack(accessToken, track) {
      const query = encodeURIComponent(`${track.title} artist:${track.artist}`);
      try {
        const searchResponse = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        return searchResponse.data.tracks.items.length > 0 ? searchResponse.data.tracks.items[0].uri : null;
      } catch (error) {
        console.error('Failed to search for track:', error);
        return null;
      }
    },
    async createSpotifyPlaylist(accessToken, userId, playlistName, tracks) {
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
        const newPlaylistId = createPlaylistResponse.data.id;
        const trackUris = await Promise.all(tracks.map(track => this.searchTrack(accessToken, track)));
        const validUris = trackUris.filter(uri => uri != null);
        if (validUris.length > 0) {
          await axios.post(`https://api.spotify.com/v1/playlists/${newPlaylistId}/tracks`, { uris: validUris }, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });
          this.success = true; // Set success flag to true
          this.creating = false; // Update creating to false
          setTimeout(() => window.close(), 2000); // Close the window after 2 seconds
        }
      } catch (error) {
        console.error('Failed to create or populate playlist:', error);
        this.error = 'Failed to create playlist on Spotify.';
        this.creating = false;
      }
    }
  }
}
</script>

<template>
  <div class="export-process">
    <h1 v-if="creating">Creating Playlist...</h1>
    <div v-if="success" class="success-message">
      Playlist created successfully! Closing this window shortly...
    </div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<style scoped>
.export-process {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

.success-message, .error-message {
  color: #fff;
  background-color: #44c767; /* Green for success */
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
}

.error-message {
  background-color: #f44336; /* Red for error */
}
</style>
