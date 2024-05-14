//src\stores\usePromptStore.js
import { defineStore } from 'pinia';
import axios from 'axios'; 
import { usePlaylistStore } from './usePlaylistStore';
import { useAuthStore } from './useAuthStore';

export const usePromptStore = defineStore('prompt', {
  state: () => ({
    regenerateAttempts: 0,
    vibes: {
      selectedMood: '',
      selectedActivity: '',
      selectedFamiliarity: '',
      selectedSetting: '',
    },
    tones: {
      selectedGenres: [],
      selectedEra: [],
    },
    songs: [
      { name: '', artist: '', influence: 50 },
      { name: '', artist: '', influence: 50 },
      { name: '', artist: '', influence: 50 }
    ],
    modal: {
      show: false,
      message: ''
    },
    previouslyGeneratedSongs: [] 
  }),
  actions: {
    resetStore() {
      this.vibes = { selectedMood: '', selectedActivity: '', selectedFamiliarity: '', selectedSetting: '' };
      this.tones = { selectedGenres: [], selectedEra: [] };
      this.songs = [{ name: '', artist: '' }, { name: '', artist: '' }, { name: '', artist: '' }];
      this.modal = { show: false, message: '' };
      this.previouslyGeneratedSongs = [];
    },
    showModal(message) {
      this.modal.show = true;
      this.modal.message = message;
    },
    hideModal() {
      this.modal.show = false;
      this.modal.message = '';
    },
    updateVibeSelection(type, value) {
      this.vibes[type] = value;
    },
    toggleGenreSelection(genre) {
      const index = this.tones.selectedGenres.indexOf(genre);
      if (index !== -1) {
        this.tones.selectedGenres.splice(index, 1);
      } else if (this.tones.selectedGenres.length < 3) {
        this.tones.selectedGenres.push(genre);
      }
    },
    validateVibes() {
      const fieldsFilled = Object.values(this.vibes).filter(value => value.trim() !== '').length;
      if (fieldsFilled < 2) {
        this.showModal('Please fill at least two fields to proceed.');
        return false;
      }
      return true;
    },
    validateTones() {
        const hasGenres = this.tones.selectedGenres.length > 0;
        const hasEras = this.tones.selectedEra.length > 0;
        if (!hasGenres || !hasEras) {
            this.showModal(`Please select at least one genre and one era.`);
            return false;
        }
        return true;
    },
    validateSongs() {
        const isSongsValid = this.songs.filter(song => song.name.trim() !== '' && song.artist.trim() !== '').length;
        if (isSongsValid === 0 || isSongsValid > 3) {
            this.showModal('Please enter between 1 and 3 songs, each with a name and an artist.');
            return false;
        }
        return true;
    },
    updateSong(index, field, value) {
      if (index >= 0 && index < this.songs.length) {
        this.songs[index][field] = value;
      } else {
        console.error('Invalid song index:', index);
      }
    },
    validateAll() {
      const isTonesValid = this.validateTones();
      const isSongsValid = this.validateSongs(); 
      const isVibeValid = this.validateVibes();
    
      const isAllValid =  isTonesValid && isSongsValid && isVibeValid;
      return isAllValid;
    },

    async generatePlaylist(newMusic) {
      const authStore = useAuthStore(); 
      const playlistStore = usePlaylistStore();
      if (!this.validateAll()) {
        console.error("Validation failed. Make sure all required fields are filled correctly.");
        return;
      }
    
      if (authStore.user && authStore.user.tokens >= 2) {
        await authStore.fetchUserProfile();  
        const userTaste = {
          favouriteArtists: authStore.user.favourite_artists.join(', '),
          dislikedArtists: authStore.user.disliked_artists.join(', ')
        }; 
    
        const previousSongs = newMusic ? await playlistStore.fetchUserPlaylists(authStore.user.uid) : [];
        const excludeSongs = previousSongs.filter(Boolean);
        const playlistDetails = {
          vibes: this.vibes,
          tones: {
            genres: this.tones.selectedGenres || [],
            eras: this.tones.selectedEra || []
          },
          songs: this.songs.map(song => ({
            name: song.name.trim(),
            artist: song.artist.trim(),
            influence: song.influence
          })).filter(song => song.name && song.artist),
          userTaste: userTaste,
          excludeSongs: excludeSongs,
          dislikedArtists: authStore.user.disliked_artists || []  
        };
    
        try {
          const apiUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';
          const response = await axios.post(`${apiUrl}/generate-playlist`, playlistDetails);
          const formattedPlaylist = this.formatPlaylist(response.data.songs);
          const formattedAlternativeSongs = this.formatAlternativePlaylist(response.data.alternativeSongs);
          playlistStore.setPlaylistDetails(formattedPlaylist);  
          playlistStore.setAlternativeSongs(formattedAlternativeSongs)
          await authStore.updateUserTokens(authStore.user.tokens - 2); 
          this.previouslyGeneratedSongs = formattedPlaylist.map(song => `${song.title} - ${song.artist}`);
        } catch (error) {
          console.error('Error fetching playlist:', error);
        }
      } else {
        this.showModal("Insufficient tokens to generate a playlist.");
      }
    },   
    async regeneratePlaylist() {
      const authStore = useAuthStore();
      const playlistStore = usePlaylistStore(); 
      if (this.regenerateAttempts >= 2) {
        this.showModal("Regeneration limit reached.");
        return;
      }
    
      if (!this.validateAll()) {
        console.error("Validation failed. Make sure all required fields are filled correctly.");
        return;
      }
    
      if (authStore.user && authStore.user.tokens >= 2) {
        await authStore.fetchUserProfile();  
        const userTaste = {
          favouriteArtists: authStore.user.favourite_artists.join(', '),
          dislikedArtists: authStore.user.disliked_artists.join(', ')
        }; 
    
        if (!Array.isArray(playlistStore.playlistDetails)) {
          console.error("Expected playlistDetails to be an array, got:", typeof playlistStore.playlistDetails);
          this.showModal("Error: No existing playlist details found.");
          return;
        }
        const previousSongs = await playlistStore.fetchUserPlaylists(authStore.user.uid);
        const excludeSongs = [...previousSongs.filter(Boolean), ...this.previouslyGeneratedSongs];
        console.log('prev excluded : ', this.previouslyGeneratedSongs)
        console.log('exclude songs : ', excludeSongs)
        const playlistDetails = {
          vibes: this.vibes,
          tones: {
            genres: this.tones.selectedGenres || [],
            eras: this.tones.selectedEra || []
          },
          songs: this.songs.map(song => ({
            name: song.name.trim(),
            artist: song.artist.trim(),
            influence: song.influence
          })).filter(song => song.name && song.artist),
          userTaste: userTaste,
          excludeSongs: excludeSongs,
          dislikedArtists: authStore.user.disliked_artists || []
        };
    
        console.log('playlist details : ', playlistDetails)
    
        try {
          await authStore.deductTokens(2);
          const apiUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';
          const response = await axios.post(`${apiUrl}/generate-playlist`, playlistDetails);
          playlistStore.setPlaylistDetails(this.formatPlaylist(response.data.songs));
          playlistStore.setAlternativeSongs(this.formatAlternativePlaylist(response.data.alternativeSongs)); 
          this.regenerateAttempts++;
        } catch (error) {
          console.error('Error regenerating playlist:', error);
          this.showModal("Failed to regenerate playlist.");
        }
      } else {
        this.showModal("Insufficient tokens to regenerate a playlist.");
      }
    },
    formatPlaylist(playlistArray) {
        if (!Array.isArray(playlistArray)) {
            console.error("Expected an array but received:", typeof playlistArray);
            return [];
        }
    
        return playlistArray.map(line => {
            if (!line.trim() || !line.includes('-') || !line.includes(':')) return null; // Enhanced validation
            try {
                const [titleArtist, releaseYear] = line.trim().split(':');
                if (!titleArtist || !releaseYear) throw new Error("Malformed line, missing components");
                const [title, artist] = titleArtist.split(' - ');
                if (!title || !artist) throw new Error("Malformed line, missing title or artist");
                return { title: title.trim(), artist: artist.trim(), releaseYear: releaseYear.trim() };
            } catch (error) {
                console.error("Error parsing playlist line:", line, error);
                return null;
            }
        }).filter(song => song !== null);
    },
    
    formatAlternativePlaylist(alternativeSongsArray) {
        if (!Array.isArray(alternativeSongsArray)) {
            console.error("Expected an array but received:", typeof alternativeSongsArray);
            return [];
        }
    
        return alternativeSongsArray.map(line => {
            if (!line.trim() || !line.includes('-') || !line.includes(':')) return null;
            try {
                const [titleArtist, releaseYear] = line.trim().split(':');
                if (!titleArtist || !releaseYear) throw new Error("Malformed line, missing components");
                const [title, artist] = titleArtist.split(' - ');
                if (!title || !artist) throw new Error("Malformed line, missing title or artist");
                return { title: title.trim(), artist: artist.trim(), releaseYear: releaseYear.trim() };
            } catch (error) {
                console.error("Error parsing alternative song line:", line, error);
                return null;
            }
        }).filter(song => song !== null);
    }  
  }  
});
