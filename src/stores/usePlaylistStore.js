// src/stores/usePlaylistStore.js
import { defineStore } from 'pinia';

export const usePlaylistStore = defineStore('playlist', {
  state: () => ({
    playlistDetails: null,  // This will hold the playlist data
  }),
  actions: {
    setPlaylistDetails(details) {
      const parsedDetails = details.split('\n').map(line => {
          const [titleArtist, releaseYear] = line.split(':');
          const [title, artist] = titleArtist.split(' - ');
          return { title: title.trim(), artist: artist.trim(), releaseYear: releaseYear.trim() };
      });
      this.playlistDetails = parsedDetails;
  },
    clearPlaylistDetails() {
      this.playlistDetails = null;
    }
  }
});
