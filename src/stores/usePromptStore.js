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
    ]
  }),
  actions: {
    updateVibeSelection(type, value) {
      this.vibes[type] = value;
    },
    validateVibes() {
      const vibeValues = Object.values(this.vibes);
      const isVibesValid = vibeValues.every(value => value.trim() !== '');
      console.log('vibe values in store : ', vibeValues)
      if (!isVibesValid) console.log("Vibes validation failed", this.vibes);
      return isVibesValid;
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
      console.log('store this.tones.selectedGenres.length ', this.tones.selectedGenres.length)
      console.log('store this.tones.selectedEras.length ', this.tones.selectedEra.length)
      const isTonesValid = this.tones.selectedGenres.length <= 3 && this.tones.selectedEra.length <= 3;
      if (!isTonesValid) console.log("Tones validation failed", this.tones);
      return isTonesValid;
    },

    updateSong(index, field, value) {
      this.songs[index][field] = value;
    },
    validateSongs() {
      const isSongsValid = this.songs.filter(song => song.name.trim() !== '' && song.artist.trim() !== '').length <= 3;
      if (!isSongsValid) console.log("Songs validation failed", this.songs);
      return isSongsValid;
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
