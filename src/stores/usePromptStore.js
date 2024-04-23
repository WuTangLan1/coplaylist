import { defineStore } from 'pinia';

export const usePromptStore = defineStore('prompt', {
  state: () => ({
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
    }
    
  }
});
