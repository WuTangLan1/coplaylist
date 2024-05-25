<!-- // In exportSuccess.vue -->
<script>
import axios from 'axios';

export default {
  data() {
    return {
      error: null
    };
  },
  created() {
    const { token, user_id } = this.$route.query;
    if (token && user_id) {
        const trackDetails = JSON.parse(sessionStorage.getItem('trackDetails'));
        const playlistName = JSON.parse(sessionStorage.getItem('playlistName'));  // Retrieve the playlist name
        sessionStorage.removeItem('trackDetails'); // Clean up after retrieval
        sessionStorage.removeItem('playlistName'); // Clean up after retrieval
        if (playlistName && trackDetails) {
            this.createSpotifyPlaylist(token, user_id, decodeURIComponent(playlistName), trackDetails);
        } else {
            this.error = "No track details or playlist name available.";
        }
    } else {
        this.error = "Failed to receive all necessary parameters.";
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
        return null; // Ensure failure doesn't halt other track searches
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
        }
      } catch (error) {
        console.error('Failed to create or populate playlist:', error);
        this.error = 'Failed to create playlist on Spotify.';
      }
    }
  }
}
</script>


<template>
  <div>
    Exporting your playlist to Spotify...
    <div v-if="error">{{ error }}</div>
  </div>
</template>
