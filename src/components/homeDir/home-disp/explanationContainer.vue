<!-- src/components/homeDir/explanationContainer.vue -->
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
  <v-container class="explanation-container" fluid>
    <v-row class="explanation-content" justify="center">
      <v-col cols="12" class="text-center">
        <h1>Welcome to <img src="@/assets/images/header/cp_logo_transparent.png" alt="CoPlaylist Logo" class="logo"/></h1>
        <p>CoPlaylist is an innovative music streaming application designed to deliver personalized playlists to users, finely tuned to their unique tastes and situational preferences. By tapping into advanced algorithms, CoPlaylist offers a bespoke musical journey that deeply resonates on a personal level.</p>
      </v-col>
    </v-row>
    <v-row class="features-container" justify="center">
      <transition name="fade" mode="out-in">
        <component :is="components[currentComponentIndex]" :key="currentComponentIndex"></component>
      </transition>
    </v-row>
    <v-row class="button-group" justify="center" align="center">
      <v-col cols="4" class="d-flex justify-center">
        <v-btn class="next-button improve-playlist" @click="improvePlaylist" disabled>
          <v-icon left>mdi-pencil</v-icon>
          Improve
        </v-btn>
      </v-col>
      <v-col cols="4" class="d-flex justify-center">
        <v-btn class="next-button discover" @click="discover">
          <v-icon left>mdi-magnify</v-icon>
          Discover
        </v-btn>
      </v-col>
      <v-col cols="4" class="d-flex justify-center">
        <v-btn class="next-button long-gen" @click="getStarted">
          <v-icon left>mdi-play-circle</v-icon>
          Generate
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
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
  padding: 1rem;
}

.explanation-content h1 {
  text-align: center;
  color: #2D3047;
  margin-bottom: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  height: auto;
  max-height: 1.58em;
  margin-left: 0.5em;
}

.explanation-content {
  text-align: center;
  line-height: 1.6;
  color: #333;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  margin-bottom: 0.2rem;
}

.features-container {
  display: flex;
  justify-content: center;
  margin-bottom: 0.2rem;
}

.button-group {
  display: flex;
  width: 100%;
}

.button-col {
  display: flex;
  justify-content: center;
}

.next-button {
  width: 100%;
  color: white;
  border-radius: 0.2rem;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.discover {
  background-color: #36aa4f;
}

.long-gen {
  background-color: #4c56af;
}

.improve-playlist {
  background-color: #A0A0A0;
  cursor: not-allowed;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
