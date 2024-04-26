// src/stores/usePlaylistStore.js
import { defineStore } from 'pinia';

export const usePlaylistStore = defineStore('playlist', {
  state: () => ({
    playlistDetails: null, 
    playlistName: '',
  }),
  actions: {
    setPlaylistDetails(responseData) {
      if (typeof responseData === 'string' && responseData.includes('Playlist Name:')) {
        const sections = responseData.split('\n\n');  // Assuming there are two line breaks between the name and the songs.
        const nameLine = sections.shift(); // This removes the first section which is supposed to be the name.
        this.playlistName = nameLine.replace('Playlist Name: ', '').trim();
        console.log(this.playlistDetails)
        const details = sections.join('\n'); // Join the remaining sections back to form the details string if multiple sections.
        const parsedDetails = details.split('\n').map(line => {
          const [titleArtist, releaseYear] = line.split(':');
          const [title, artist] = titleArtist.split(' - ');
          return { title: title.trim(), artist: artist.trim(), releaseYear: releaseYear.trim() };
        });
        this.playlistDetails = parsedDetails;
      } else if (Array.isArray(responseData)) {
          // Directly setting details if already parsed
          this.playlistDetails = responseData;
      } else {
          console.error("Invalid details format:", responseData);
          this.playlistDetails = [];
      }
    },
    clearPlaylistDetails() {
      this.playlistDetails = null;
    }
  }
});
