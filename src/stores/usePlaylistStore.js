// src/stores/usePlaylistStore.js
import { defineStore } from 'pinia';

export const usePlaylistStore = defineStore('playlist', {
  state: () => ({
    playlistDetails: null, 
    playlistName: '',
  }),
  actions: {
    setPlaylistDetails(responseData) {
      if (typeof responseData === 'string') {
        const nameMatch = responseData.match(/^Playlist Name: (.+)$/m); // Use regex to find the name
        if (nameMatch && nameMatch[1]) {
          this.playlistName = nameMatch[1].trim();
          console.log('playlist name : ', this.playlistName)
        }
      }

      if (typeof responseData === 'string' && responseData.includes('\n')) {
        const sections = responseData.split('\n\n');  
        sections.shift(); 
        const details = sections.join('\n'); 
        const parsedDetails = this.parsePlaylistDetails(details);
        this.playlistDetails = parsedDetails.filter(detail => detail !== null); 
      } else if (Array.isArray(responseData)) {
        this.playlistDetails = responseData;
      } else {
        console.error("Invalid details format:", responseData);
        this.playlistDetails = [];
      }
    },
    parsePlaylistDetails(detailsString) {
      const songLines = detailsString.split('\n').filter(line => line.includes('-') && line.includes(':'));
      return songLines.map(line => {
        try {
          const [titleArtist, releaseYear] = line.split(':');
          const [title, artist] = titleArtist.split(' - ');
          return { title: title.trim(), artist: artist.trim(), releaseYear: releaseYear.trim() };
        } catch (error) {
          console.error("Error parsing line:", line, error);
          return null;
        }
      });
    },
    clearPlaylistDetails() {
      this.playlistDetails = null;
    }
  }
});
