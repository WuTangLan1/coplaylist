// src/stores/usePlaylistStore.js
import { defineStore } from 'pinia';

export const usePlaylistStore = defineStore('playlist', {
  state: () => ({
    playlistDetails: null,  // This will hold the playlist data
  }),
  actions: {
    setPlaylistDetails(details) {
      this.playlistDetails = details;
    },
    clearPlaylistDetails() {
      this.playlistDetails = null;
    }
  }
});
