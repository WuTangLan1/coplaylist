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
    comingSoon() {
      // Placeholder function until the functionality is implemented
    },
    improvePlaylist() {
      this.$router.push('/improve-playlist');
    },
    startRotation() {
      setInterval(() => {
        this.currentComponentIndex = (this.currentComponentIndex + 1) % this.components.length;
      }, 5000);
    },
    beforeEnter(el) {
      el.style.transform = 'translateX(-100%) scale(0.95)';
      el.style.opacity = '0';
    },
    enter(el, done) {
      el.offsetHeight; // trigger reflow
      this.$nextTick(() => {
        el.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        el.style.transform = 'translateX(0) scale(1)';
        el.style.opacity = '1';
        done();
      });
    },
    leave(el, done) {
      el.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
      el.style.transform = 'translateX(100%) scale(0.95)';
      el.style.opacity = '0';
      setTimeout(() => done(), 800); // match transition duration
    }
  }
};
</script>


<template>
  <v-container class="explanation-container" fluid>
    <v-row class="explanation-content" justify="center">
      <v-col cols="12" class="text-center">
        <h1>Welcome to <img src="@/assets/images/header/cp_logo_transparent.png" alt="CoPlaylist Logo" class="logo"/></h1>
        <p>Discover, Share, and Generate Personalized Music Playlists</p>
      </v-col>
    </v-row>
    <v-row class="features-container" justify="center">
      <transition
          name="slide-fade-scale"
          mode="out-in"
          appear
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <component :is="components[currentComponentIndex]" :key="currentComponentIndex"></component>
        </transition>

    </v-row>
    <v-row class="button-group" justify="space-between">
      <v-col cols="4" xs="4" sm="4" md="4" class="d-flex justify-center button-col" style="padding: 0 4px;">
        <v-btn class="next-button improve-playlist" @click="comingSoon" disabled>
            <img src="@/assets/images/explanation-container/discover.png" alt="ComingSoon" class="button-image">
            Discover
            <span class="badge">Coming Soon</span>
          </v-btn>
      </v-col>
      <v-col cols="4" xs="4" sm="4" md="4" class="d-flex justify-center button-col" style="padding: 0 4px;">
        <v-btn class="next-button improve-playlist" @click="comingSoon" disabled>
          <img src="@/assets/images/explanation-container/improve.png" alt="Improve" class="button-image">
          Improve
          <span class="badge">Coming Soon</span>
        </v-btn>
      </v-col>
      <v-col cols="4" xs="4" sm="4" md="4" class="d-flex justify-center button-col" style="padding: 0 4px;">
        <v-btn class="next-button long-gen" @click="getStarted">
          <img src="@/assets/images/explanation-container/generate.png" alt="Generate Playlist" class="button-image">
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
  background: #ebeaff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  padding-bottom: 10px;
}

.explanation-content h1 {
  text-align: center;
  color: #2D3047;
  margin-bottom: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
}

.explanation-content p {
  margin-top: 0.5rem;
  margin-bottom: 0.8rem;
  font-size: 1rem;
  color: #555;
}

.logo {
  height: auto;
  max-height: 1.7em;
  margin-left: 0.5em;
}

.features-container {
  display: flex;
  justify-content: center;
  margin-bottom: 0.2rem;
  min-height: 500px;
}

@media (min-width: 1000px) {
  .features-container {
    min-width: 800px;
    min-height: 53vh;
  }
}

.button-group {
  display: flex;
  width: 100%;
  margin: 0;
}

.button-col {
  padding: 0 0px;
  display: flex;
  justify-content: center;
}

@media (min-width: 500px) {
  .button-col {
    padding: 0 8px;
  }
}

.next-button {
  width: 100%;
  color: white;
  border-radius: 0.2rem;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  text-transform: none;
  display: flex;
  align-items: center;
  position: relative;
}

.button-image {
  margin-right: 8px;
  width: 24px;
  height: 24px;
}


.discover {
  background-color: #36aa4f;
}

.long-gen {
  background-color: #4c56af;
}

.improve-playlist {
  position: relative;
  background-color: #A0A0A0;
  cursor: not-allowed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 18px;
}

.badge {
  position: absolute;
  top: 50%;
  right: 50%; 
  transform: translate(50%, -50%); 
  background-color: #ff0000;
  color: white;
  font-size: 0.75em;
  padding: 4px 8px;
  border-radius: 10px;
  z-index: 10;
}

.improve-playlist .button-image {
  margin-right: 4px; /* Adjust spacing if necessary */
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-fade-scale-enter-active, .slide-fade-scale-leave-active {
  transition: transform 0.8s ease, opacity 0.8s ease;
}

.slide-fade-scale-enter, .slide-fade-scale-leave-to {
  transform: translateX(-100%) scale(0.95);
  opacity: 0;
}

.slide-fade-scale-leave-active {
  position: absolute; 
}
</style>