// src/stores/useImproveStore.js
import { defineStore } from 'pinia';

export const useImproveStore = defineStore('improve', {
  state: () => ({
    improvedTracks: []
  }),
  actions: {
    setImprovedTracks(responseData) {
      const tracks = responseData.match(/\*\*\*([^\*]+)\*\*\*/g).map(item => {
        const track = item.replace(/\*\*\*/g, '').trim();
        const [title, artist] = track.split('by');
        return { title: title.trim(), artist: artist.trim() };
      });
      this.improvedTracks = tracks;
    },
    clearImprovedTracks() {
      this.improvedTracks = [];
    }
  }
});
