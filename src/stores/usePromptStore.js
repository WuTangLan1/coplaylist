//src\stores\usePromptStore.js
import { defineStore } from 'pinia';
import axios from 'axios'; 
import { usePlaylistStore } from './usePlaylistStore';
import { useRouter } from 'vue-router';

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
        const song = {...this.songs[index], [field]: value}; // Create a new song object with updated field
        this.songs.splice(index, 1, song); // Replace the old song object with the new one in a reactive way
      } else {
        console.error('Invalid song index:', index);
      }
    },
    validateAll() {
      const isTonesValid = this.validateTones();
      const isSongsValid = this.validateSongs(); 
      const isVibeValid = this.validateVibes();
    
      const isAllValid =  isTonesValid && isSongsValid && isVibeValid;
      if (!isAllValid) console.log("Overall validation failed");
      return isAllValid;
    },
    async generatePlaylist() {
      if (!this.validateAll()) {
        console.error("Validation failed. Make sure all required fields are filled correctly.");
        return;
      }
    
      const playlistDetails = {
        vibes: this.vibes,
        tones: {
          genres: this.tones.selectedGenres || [],
          eras: this.tones.selectedEra || []
        },
        songs: this.songs.filter(song => song.name.trim() && song.artist.trim())
      };
    
      try {
        const response = await axios.post('http://localhost:3000/generate-playlist', playlistDetails);
        console.log('Generated Playlist:', response.data);
        const playlistStore = usePlaylistStore();
        playlistStore.setPlaylistDetails(response.data);
        const router = useRouter();
        router.push({ name: 'Output' }); 
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    }  
  }
});
