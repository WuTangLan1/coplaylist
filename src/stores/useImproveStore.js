// src/stores/useImproveStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useImproveStore = defineStore('improve', {
  state: () => ({
    userPlaylists: [],
    selectedPlaylist: null,
  }),
  actions: {
    async fetchUserPlaylists(accessToken) {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        this.userPlaylists = response.data.items;
      } catch (error) {
        console.error('Error fetching user playlists:', error);
      }
    },
    setSelectedPlaylist(playlist) {
      this.selectedPlaylist = playlist;
    },
  },
});