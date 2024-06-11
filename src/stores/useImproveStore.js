// src/stores/useImproveStore.js
import { defineStore } from 'pinia';

export const useImproveStore = defineStore('improve', {
  state: () => ({
    improvedTracks: []
  }),
  actions: {
    setImprovedTracks(responseData) {
      if (!responseData) {
        console.error("Invalid or unexpected response data:", responseData);
        return;
      }
    
      console.log('Raw response data:', responseData);
    
      // Clear existing tracks to avoid displaying old data
      this.improvedTracks = [];
    
      // Improved regex to match "song title by artist" more reliably
      const lines = responseData.split('\n');
      lines.forEach(line => {
        const match = line.match(/^\d*\.?\s*([^-\n]+?)\s*(?:-|by)\s*([^-\n]+)$/);
        if (match) {
          this.improvedTracks.push({ title: match[1].trim(), artist: match[2].trim() });
        } else {
          console.error('Line not matched:', line);
        }
      });
    
      // Log to check what we are actually pushing to state
      console.log(this.improvedTracks);
    }
    
  }    
});
