<!-- src\components\improve\improvedPlaylist.vue -->
 
<script>
import { useImproveStore } from '@/stores/useImproveStore';

export default {
  setup() {
    const improveStore = useImproveStore();
    return { improveStore };
  }
};
</script>


<template>
  <div class="improved-playlist-card">
    <div v-if="improveStore.improvedTracks.length">
      <v-card
        v-for="(track, index) in improveStore.improvedTracks"
        :key="index"
        class="track-card"
      >
        <v-card-title class="track-name">{{ track.title }}</v-card-title>
        <v-card-subtitle class="artist-name">{{ track.artist }}</v-card-subtitle>
      </v-card>
    </div>
    <div v-else class="no-tracks">No improved tracks available.</div>
  </div>
</template>

<style scoped>
.improved-playlist-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100vw;
  margin: auto;
  padding: 0 5%; /* Use percentage for padding */
  box-sizing: border-box;
  overflow-x: hidden;
  background-color: #2D2F48;
}

.track-card {
  width: 100%; /* Full width */
  background-color: #3A3B55;
  color: #FFF;
  margin-bottom: 5px;
  border-radius: 4px;
  padding: 10px; /* Uniform padding */
  box-shadow: none;
  border: none;
}

.track-name {
  font-size: 1.2rem; /* Responsive font size */
}

.artist-name {
  font-size: 1rem;
  color: #BBBBBB;
}

.no-tracks {
  font-size: 1rem;
  color: #AAAAAA;
  font-style: italic;
}

@media (max-width: 600px) {
  .improved-playlist-card {
    padding: 0 10px;
  }
  
  .track-name, .artist-name {
    font-size: 0.9rem; /* Smaller font size for very small devices */
  }
}
</style>
