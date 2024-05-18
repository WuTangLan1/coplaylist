<!-- src\components\homeDir\explanationContainer.vue -->
<script>
import generateMessage from './generateMessage.vue';
 import expandMessage from './expandMessage.vue';
 import shareMessage from './shareMessage.vue';

export default {
  components: {
    generateMessage,
     expandMessage,
     shareMessage
  },
  data() {
    return {
      currentComponentIndex: 0,
      components: [
        'generateMessage',
         'expandMessage',
         'shareMessage'
      ]
    };
  },
  mounted() {
    this.startRotation();
  },
  methods: {
    getStarted() {
      this.$emit('next');
    },
    discover() {
      this.$router.push('/discover');
    },
    startRotation() {
      setInterval(() => {
        this.currentComponentIndex = (this.currentComponentIndex + 1) % this.components.length;
      }, 5000);
    }
  }
};
</script>

<template>
  <div class="explanation-container">
    <div class="explanation-content">
      <h1>
        <span>Welcome to <img src="@/assets/images/header/cp_logo_transparent.png" alt="CoPlaylist Logo" class="logo"/></span>
      </h1>
      <p>CoPlaylist is an innovative music streaming application designed to deliver personalized playlists to users, finely tuned to their unique tastes and situational preferences. By tapping into advanced algorithms, CoPlaylist offers a bespoke musical journey that deeply resonates on a personal level.</p>
      <div class="features-container">
        <component :is="components[currentComponentIndex]"></component>
      </div>
      <div class="button-group">
        <button class="next-button improve-playlist" @click="improvePlaylist" disabled>
          <img src="@/assets/images/explanation-container/improve.png" alt="Improve Playlist" class="button-image">
          <span>Improve</span>
        </button>
        <button class="next-button discover" @click="discover">
          <img src="@/assets/images/explanation-container/discover.png" alt="Discover" class="button-image">
          <span>Discover</span>
        </button>
        <button class="next-button long-gen" @click="getStarted">
          <img src="@/assets/images/explanation-container/generate.png" alt="Generate Playlist" class="button-image">
          <span>Generate</span>
        </button>
      </div>
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
  margin: 0 auto;
  background: #fbeaff;
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

@media (min-width: 600px) {
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
  text-align: center;
  line-height: 1.6;
  color: #333;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  margin-bottom: 2rem;
}

.features-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.next-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  color: white;
  border-radius: 0.2rem;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  width: 100%;
  max-width: 150px;
  margin: 0 5px;
}

.next-button img {
  margin-right: 8px;
  width: 24px;
  height: 24px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
}

@media (max-width: 450px) {
  .next-button {
    padding: 12px 0;
  }
}

.long-gen {
  background-color: #4c56af;
}

.long-gen:hover {
  background-color: #46367c;
}

.discover {
  background-color: #36aa4f;
}

.improve-playlist {
  background-color: #A0A0A0;
  cursor: not-allowed;
}

@media (max-width: 420px) {
  .next-button {
    width: 100%;
    padding: 12px 0;
  }
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