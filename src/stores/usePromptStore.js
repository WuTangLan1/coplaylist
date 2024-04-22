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
      const isAllValid = this.validateVibes() && this.validateTones() && this.validateSongs();
      if (!isAllValid) console.log("Overall validation failed");
      return isAllValid;
    }
  }
});
