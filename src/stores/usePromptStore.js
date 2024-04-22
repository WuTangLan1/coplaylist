// src/stores/usePromptStore.js
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
    // Vibe actions
    updateVibeSelection(type, value) {
      this.vibes[type] = value;
    },
    validateVibes() {
      // Here you can implement the validation logic for vibes
      // For simplicity, checking if all fields are filled
      const vibeValues = Object.values(this.vibes);
      return vibeValues.every(value => value.trim() !== '');
    },

    // Tone actions
    toggleGenreSelection(genre) {
      const index = this.tones.selectedGenres.indexOf(genre);
      if (index !== -1) {
        this.tones.selectedGenres.splice(index, 1);
      } else {
        this.tones.selectedGenres.push(genre);
      }
    },
    validateTones() {
      // Validate that at least one genre and one era are selected
      return this.tones.selectedGenres.length > 0 && this.tones.selectedEra.length > 0;
    },

    // Songs actions
    updateSong(index, field, value) {
      this.songs[index][field] = value;
    },
    validateSongs() {
      // Validate that each song has a name and artist
      return this.songs.every(song => song.name.trim() !== '' && song.artist.trim() !== '');
    },

    // General validation method
    validateAll() {
      return this.validateVibes() && this.validateTones() && this.validateSongs();
    }
  }
});
