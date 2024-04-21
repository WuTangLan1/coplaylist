<!-- src\components\homeDir\explanationContainer.vue -->
<script>
export default {
  methods: {
    getStarted() {
      this.$emit('next');
    }
  }
};
</script>

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
      <button class="next-button" @click="getStarted">Lets get started !</button>
    </div>
  </template>
  
  <style scoped>
.explanation-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 800px; /* Max width for better readability */
  margin: auto; /* Center the container */
  padding: 20px;
  background: #F4F4F4; /* Light background to pop content */
  border-radius: 8px; /* Slight rounding of corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  border: 1px solid #blue; /* Thin blue border */
}

.explanation-content h1 {
  text-align: center; /* Center align the header */
  color: #2D3047; /* A dark, rich color for headings */
  margin-bottom: 1rem;
}
  
  .explanation-content {
    text-align: left;
    line-height: 1.6; /* Improve line spacing */
    color: #333; /* Darker text for better contrast */
  }
  
  h1 {
    color: #2D3047; /* A dark, rich color for headings */
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: inside square; /* Stylish bullet points */
  }
  
  li strong {
    color: #4c65af; /* Color coding for key terms */
  }
  
  .next-button {
    align-self: flex-end;
    padding: 10px 20px;
    background-color: #4c56af; /* A vibrant color for action */
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    transition: background-color 0.3s ease; 
  }
  
  .next-button:hover {
    background-color: #46367c; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    .explanation-container {
      padding: 10px;
    }
  
    .next-button {
      width: 100%; /* Full-width button on smaller screens */
      margin-top: 20px; /* Add space above the button */
    }
  }
  </style>
  