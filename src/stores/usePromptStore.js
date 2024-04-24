//src\stores\usePromptStore.js
import { defineStore } from 'pinia';
import axios from 'axios'; 
import { usePlaylistStore } from './usePlaylistStore';

export const usePromptStore = defineStore('prompt', {
  state: () => ({
    vibes: {
      selectedMood: '',
      selectedActivity: '',
      selectedFamiliarity: '',
      selectedSetting: '',
      selectedPlatform: ''
    },
    tones: {
      selectedGenres: [],
      selectedEra: [],
    },
    songs: [
      { name: '', artist: '' },
      { name: '', artist: '' },
      { name: '', artist: '' }
    ],
    modal: {
      show: false,
      message: ''
    }
  }),
  actions: {
    resetStore() {
      this.vibes = { selectedMood: '', selectedActivity: '', selectedFamiliarity: '', selectedSetting: '' , selectedPlatform:''};
      this.tones = { selectedGenres: [], selectedEra: [] };
      this.songs = [{ name: '', artist: '' }, { name: '', artist: '' }, { name: '', artist: '' }];
      this.modal = { show: false, message: '' };
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
    validateVibes() {
      const fieldsFilled = Object.values(this.vibes).filter(value => value.trim() !== '').length;
      if (fieldsFilled < 2) {
        this.showModal('Please fill at least two fields to proceed.');
        return false;
      }
      return true;
    },
    toggleGenreSelection(genre) {
      const index = this.tones.selectedGenres.indexOf(genre);
      if (index !== -1) {
        this.tones.selectedGenres.splice(index, 1);
      } else if (this.tones.selectedGenres.length < 3) {
        this.tones.selectedGenres.push(genre);
      }
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
    updateSong(index, field, value) {
      this.songs[index][field] = value;
    },
    validateSongs() {
      const isSongsValid = this.songs.some(song => song.name.trim() !== '' && song.artist.trim() !== '');
      if (!isSongsValid) {
        this.showModal('Please enter at least one song with its artist.');
        return false;
      }
      return true;
    },
    validateAll() {
      const isTonesValid = this.validateTones();
      const isSongsValid = this.validateSongs(); 
    
      const isAllValid =  isTonesValid && isSongsValid;
      if (!isAllValid) console.log("Overall validation failed");
      return isAllValid;
    },
    async generatePlaylist() {
      if (!this.vibes || !this.songs.length) {
        console.error("Vibes and at least one song must be specified");
        return;
      }
  
      const playlistDetails = {
        vibes: this.vibes,
        tones: {
          genres: this.tones.selectedGenres || [],
          eras: this.tones.selectedEra || []
        },
        songs: this.songs.filter(song => song.name && song.artist) // Only include songs with both name and artist filled
      };
  
      try {
        const response = await axios.post('http://localhost:3000/generate-playlist', playlistDetails);
        console.log('Generated Playlist:', response.data);
        const playlistStore = usePlaylistStore();
        playlistStore.setPlaylistDetails(response.data); // Save the playlist data
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    }
  }
});
