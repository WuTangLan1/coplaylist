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
          <div class="explanation-header">
            <h1>Welcome to CoPlaylist!</h1>
          </div>
        <p>CoPlaylist is an innovative music streaming application designed to deliver personalized playlists to users, finely tuned to their unique tastes and situational preferences. By tapping into advanced algorithms, CoPlaylist offers a bespoke musical journey that deeply resonates on a personal level.</p>
        <div class="features-container">
          <div class="feature-item">
            <h3>Generate Playlist</h3>
            <img src="@/assets/images/explanation/playlist.png" alt="Artificial Intelligence" class="feature-image">
            <p>Use the latest Artificial Intelligence to curate and personalize your playlists.</p>
          </div>
          <div class="feature-item">
            <h3>Expand Your Music Knowledge</h3>
            <img src="@/assets/images/explanation/library.png" alt="Music Knowledge" class="feature-image">
            <p>Discover new genres and artists, expanding your musical horizons.</p>
          </div>
          <div class="feature-item">
            <h3>Store and Share</h3>
            <img src="@/assets/images/explanation/share.png" alt="Share Playlists" class="feature-image">
            <p>Keep your favorite tunes saved and share them with friends and family.</p>
          </div>
        </div>
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
  margin: 0; 
  padding: 20px;
  background: #F4F4F4; 
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  border: 1px solid blue;
  overflow-y: auto;
  animation: dropAnimation 1.5s ease-in-out forwards;
}

@keyframes dropAnimation {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

.expanation-header h1 {
  text-align: center;
  color: #b70000;
  margin-bottom: 1rem;
  font-size: larger;
}

.explanation-content {
  text-align: left;
  line-height: 1.6; 
  color: #333; 
}
.features-container {
  display: flex;
  flex-wrap: wrap;  
  gap: 20px; 
  justify-content: center; 
}

.feature-item {
  flex-basis: calc(33.333% - 20px);  
  display: flex;
  flex-direction: column;
  align-items: center; 
 }

.feature-image {
 max-width: 100%; 
 height: auto; 
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
    font-size: 1rem;
  }

  .next-button {
    width: 100%; 
    padding: 12px 0;
  }
}
  </style>
  