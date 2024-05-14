// src/stores/usePlaylistStore.js
import { defineStore } from 'pinia';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/components/fbDir/fbInit';

export const usePlaylistStore = defineStore('playlist', {
  state: () => ({
    playlistDetails: [],
    playlistName: '',
    alternativeSongs: [],
  }),
  actions: {
    setAlternativeSongs(alternativeSongs) {
      this.alternativeSongs = alternativeSongs;  
  },
  getAlternativeSongs() {
      return this.alternativeSongs;
  },
  setPlaylistDetails(responseData) {
    if (typeof responseData === 'string') {
      const nameMatch = responseData.match(/^Playlist Name: (.+)$/m); 
      if (nameMatch && nameMatch[1]) {
        this.playlistName = nameMatch[1].trim();
      }
    }
  
    if (typeof responseData === 'string' && responseData.includes('\n')) {
      const sections = responseData.split('\n\n');  
      sections.shift(); 
      const details = sections.join('\n'); 
      this.playlistDetails = this.parsePlaylistDetails(details);
    } else if (Array.isArray(responseData)) {
      this.playlistDetails = responseData.map(song => ({
        title: song.title,
        artist: song.artist,
        releaseYear: song.releaseYear,
        previewUrl: song.previewUrl || null 
      }));

      this.previouslyGeneratedSongs = responseData.map(song => `${song.title} - ${song.artist}`);
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
          return {
            title: title.trim(),
            artist: artist.trim(),
            releaseYear: releaseYear.trim(),
            previewUrl: null // Initialize with null, actual value should be set in an update function
          };
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
        return this.previousSongs; 
      } catch (error) {
        console.error("Error fetching playlists:", error);
        return []; 
      }
    },
    updatePlaylistDetails(newDetails) {
      if (Array.isArray(newDetails)) {
        this.playlistDetails = newDetails.map(song => ({
          ...song,
          previewUrl: song.previewUrl || null 
        }));
      } else {
        console.error("Attempted to update playlist details with non-array data");
      }
    },
    clearPlaylistDetails() {
      this.playlistDetails = [];
    }
  }
});
