// src/stores/usePlaylistStore.js
import { defineStore } from 'pinia';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/components/fbDir/fbInit';

export const usePlaylistStore = defineStore('playlist', {
  state: () => ({
    playlistDetails: [],
    playlistName: '',
  }),
  actions: {
    setPlaylistDetails(responseData) {
      if (typeof responseData === 'string') {
        const nameMatch = responseData.match(/^Playlist Name: (.+)$/m); // Use regex to find the name
        if (nameMatch && nameMatch[1]) {
          this.playlistName = nameMatch[1].trim();
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
    async fetchUserPlaylists(userId) {
      const playlistCollection = collection(db, 'playlists');
      const q = query(playlistCollection, where('creatorId', '==', userId));
      try {
        const querySnapshot = await getDocs(q);
        let playlists = [];
        querySnapshot.forEach((doc) => {
          const playlistData = doc.data();
          if (playlistData.details) {
            playlists.push(playlistData.details.map(song => `${song.title} - ${song.artist}`));
          }
        });
        this.previousSongs = playlists.flat();
        console.log('fetched previous songs : ', this.previousSongs)
        return this.previousSongs; // make sure to return something meaningful or handle it correctly
      } catch (error) {
        console.error("Error fetching playlists:", error);
        return []; // Return an empty array on error
      }
    },
      async fetchAndStoreUserPlaylists(userId) {
        try {
          const playlists = await this.fetchUserPlaylists(userId); // Ensure fetchUserPlaylists is awaited
          this.previousSongs = playlists.map(playlist =>
            playlist.details.map(song => `${song.title} - ${song.artist}`)
          ).flat();
        } catch (error) {
          console.error("Failed to fetch user playlists:", error);
        }
      },
    updatePlaylistDetails(newDetails) {
          if (Array.isArray(newDetails)) {
              this.playlistDetails = newDetails;
          } else {
              console.error("Attempted to update playlist details with non-array data");
          }
      },
    clearPlaylistDetails() {
      this.playlistDetails = [];
    }
  }
});
