<!-- src\components\inputsDir\vibeContainer.vue -->

<template>
    <div class="songs-container">
      <h2>Add Songs You Like</h2>
      <div v-for="index in 3" :key="`song-${index}`" class="input-group">
        <input
          type="text"
          :placeholder="`Song ${index}`"
          v-model="selectedSongs[index - 1]"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedSongs: ['', '', '']
      };
    }
  };
  </script>
  
  <style scoped>
  .songs-container {
    /* Styles for the container */
  }
  .input-group input {
    /* Styles for input elements */
  }
  </style>