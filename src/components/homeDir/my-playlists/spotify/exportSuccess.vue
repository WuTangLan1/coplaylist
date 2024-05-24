<!-- src\components\homeDir\my-playlists\spotify\exportSuccess.vue -->

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
      if (token) {
        this.createSpotifyPlaylist(token);
      } else {
        this.error = "Failed to receive Spotify authentication token.";
      }
    },
    methods: {
      async createSpotifyPlaylist(accessToken) {
        try {
          const response = await axios.post('https://api.spotify.com/v1/users/me/playlists', {
            name: 'New Playlist', 
            description: 'Created from CoPlaylist',
            public: false  
          }, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });
          if (response.data) {
            console.log('Playlist created:', response.data);
          }
        } catch (error) {
          console.error('Failed to create playlist:', error);
          this.error = 'Error creating playlist on Spotify.';
        }
      }
    }
  }
  </script>
  