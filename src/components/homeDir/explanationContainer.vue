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
        <h1><span>Welcome to <img src="@/assets/images/header/cp_logo_transparent.png" alt="CoPlaylist Logo" class="logo"/></span></h1>
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
      <div class="button-group">
        <button class="next-button improve-playlist" @click="improvePlaylist" disabled>Improve</button>
        <button class="next-button quick-gen" @click="quickGen" disabled>Quick Gen</button>
        <button class="next-button long-gen" @click="getStarted">Long Gen</button>
      </div>
    </div>
  </template>
  
  <style scoped>
.explanation-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin: 0; 
  background: #F4F4F4; 
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  overflow-y: auto;
  opacity: 0;  
  animation: fadeInAnimation 1.5s ease forwards;
}

@keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

@media (min-width: 600px)
{
  .explanation-container {
    padding: 1rem;
  }
}

.explanation-content h1 {
  text-align: center; 
  color: #2D3047; 
  margin-bottom: 1rem;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  width: 100%;
}

.explanation-content h1 span {
  display: inline-flex; 
  align-items: center;
}

.logo {
  height: auto;
  max-height: 1.58em; 
  margin-left: 0.5em;
  border-radius: 0.5rem;
}

.explanation-content {
  text-align: left;
  line-height: 1.6; 
  color: #333; 
  font-size: clamp(0.9rem, 2vw, 1.1rem); 
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
width: 4rem; 
 max-width: 170px;
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
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease; 
}

.long-gen {
  background-color: #4c56af; /* Original color for Long Gen */
}

.long-gen:hover {
  background-color: #46367c; /* Darker shade on hover */
}

.quick-gen {
  background-color: #A0A0A0; /* Grey color for disabled */
  cursor: not-allowed; /* Cursor indicates disabled state */
}

.improve-playlist {
  background-color: #A0A0A0; /* Grey color for disabled */
  cursor: not-allowed; /* Cursor indicates disabled state */
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}

@media (max-width: 420px) {
  .next-button {
    width: 100%;
    padding: 12px 0;
  }
}
.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
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
    font-size: 26px;
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
  