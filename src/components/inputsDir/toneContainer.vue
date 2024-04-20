<!-- src\components\inputsDir\toneContainer.vue -->

<template>
    <div class="tone-container">
      <h2>Define Your Tone</h2>
      <div class="input-group">
        <label for="genre">Genre:</label>
        <select id="genre" v-model="selectedGenre">
          <!-- Options for genre -->
        </select>
      </div>
      <div class="input-group">
        <label for="era">Era:</label>
        <select id="era" v-model="selectedEra">
          <!-- Options for era -->
        </select>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedGenre: null,
        selectedEra: null,
        // Populate with actual options
        genres: ['Pop', 'Rock', 'Jazz', 'Classical'],
        eras: ['60s', '80s', '2000s']
      };
    }
  };
  </script>
  
  <style scoped>
  .tone-container {
    /* Styles for the container */
  }
  .input-group label {
    /* Styles for labels */
  }
  .input-group select {
    /* Styles for select elements */
  }
  </style>
  