<!-- src\components\homeDir\explanationContainer.vue -->


<template>
    <div class="explanation-container">
      <div class="explanation-content">
        <h1>Welcome to CoPlaylist!</h1>
        <p>CoPlaylist is an innovative music streaming application designed to deliver personalized playlists to users, finely tuned to their unique tastes and situational preferences. By tapping into advanced algorithms, CoPlaylist offers a bespoke musical journey that deeply resonates on a personal level.</p>
        <p>Key Features Include:</p>
        <ul>
          <li><strong>User Profiles:</strong> Record your musical tastes and favorite tracks.</li>
          <li><strong>Vibes:</strong> Select moods and activities to shape the playlist to your current state or desired ambiance.</li>
          <li><strong>Tone:</strong> Choose from a variety of genres and historical eras to customize the style of your playlists.</li>
          <li><strong>Dynamic Playlists:</strong> Playlists that adapt in real-time to your selected Vibes and Tone.</li>
          <li><strong>Rating System:</strong> Rate songs and playlists to help CoPlaylist refine future recommendations.</li>
          <li><strong>Social Sharing:</strong> Share playlists, discover community favorites, and connect with friends.</li>
        </ul>
        <p>Join us and redefine your music streaming experience, making it as unique as you are!</p>
      </div>
      <button class="next-button" @click="goToNext">Next</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToNext() {
        this.$emit('next');
      }
    }
  };
  </script>
  
  <style scoped>
  .explanation-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 20px;
  }
  
  .explanation-content {
    text-align: left;
  }
  
  h1 {
    color: #123456; /* Customize your color */
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  .next-button {
    align-self: flex-end;
    padding: 10px 20px;
    background-color: #4CAF50; /* Customize button color */
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
  }
  </style>
  