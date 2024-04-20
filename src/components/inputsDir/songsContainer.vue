<!-- src\components\inputsDir\songsContainer.vue -->

<template>
    <div class="vibe-container">
      <h2>Select Your Vibe</h2>
      <div class="input-group">
        <label for="mood">Mood:</label>
        <select id="mood" v-model="selectedMood">
          <!-- Options for mood -->
        </select>
      </div>
      <div class="input-group">
        <label for="activity">Activity:</label>
        <select id="activity" v-model="selectedActivity">
          <!-- Options for activity -->
        </select>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedMood: null,
        selectedActivity: null,
        // Populate with actual options
        moods: ['Happy', 'Chill', 'Energetic', 'Sad'],
        activities: ['Working Out', 'Studying', 'Relaxing']
      };
    }
  };
  </script>
  
  <style scoped>
  .vibe-container {
    /* Styles for the container */
  }
  .input-group label {
    /* Styles for labels */
  }
  .input-group select {
    /* Styles for select elements */
  }
  </style>
  