// src/stores/useImproveStore.js
import { defineStore } from 'pinia';

export const useImproveStore = defineStore('improve', {
  state: () => ({
    improvedTracks: []
  }),
  actions: {
    setImprovedTracks(responseData) {
        const pattern = /\*\*([^\*]+)\*\*/g; 
        if (!responseData || !pattern.test(responseData)) {
          console.error("Invalid or unexpected response data:", responseData);
          return;
        }
        const tracks = [];
        let match;
        while (match = pattern.exec(responseData)) {
          const [title, artist] = match[1].split('by').map(str => str.trim());
          tracks.push({ title, artist });
        }
        this.improvedTracks = tracks;
      },
      clearImprovedTracks() {
        this.improvedTracks = [];
      }    
  }
});
