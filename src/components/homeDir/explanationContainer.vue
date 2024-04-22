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
      <button class="next-button" @click="getStarted">Lets get started</button>
    </div>
  </template>
  
  <style scoped>
.explanation-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 800px; 
  max-height: 600px;
  margin: 0; 
  padding: 20px;
  background: #F4F4F4; 
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  border: 1px solid blue;
  overflow-y: auto;
}

.explanation-content h1 {
  text-align: center; 
  color: #2D3047; 
  margin-bottom: 1rem;
}
  
  .explanation-content {
    text-align: left;
    line-height: 1.6; 
    color: #333; 
  }

  .explanation-content ul {
  list-style-type: none; 
  padding-left: 0; 
  margin-left: 0;
}

.explanation-content li::before {
  content: "• "; 
  color: #4c65af;
  font-weight: bold; 
}
  
  h1 {
    color: #2D3047; 
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: inside square; 
    text-align: left;
  }
  
  li strong {
    color: #4c65af; 
  }
  
  .next-button {
    align-self: flex-end;
    padding: 10px 20px;
    background-color: #4c56af; 
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

  .explanation-content {
    text-align: center;
  }

  .explanation-content p,
  .explanation-content ul,
  .explanation-content li {
    font-size: 16px; 
  }
  .explanation-container {
      padding: 10px;
    }
  
    .next-button {
      width: 100%; 
      margin-top: 20px; 
    }
}

@media (max-width: 420px) {
  .explanation-container {
    padding: 10px; 
  }

  .explanation-content h1 {
    font-size: 20px;
  }

  .explanation-content p,
  .explanation-content ul,
  .explanation-content li {
    font-size: 14px; 
  }

  .next-button {
    width: 100%; 
    padding: 12px 0;
  }
}
  </style>
  