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
  margin: auto;
  padding: 0 10px; 
  box-sizing: border-box;
  overflow-x: hidden;
  background-color: #2D2F48; 
  max-width: 960px; /* Setting a max-width for large screens */
}

.track-card {
  width: 100%;
  background-color: #3A3B55;
  color: #FFF;
  margin-bottom: 20px; /* Increased margin for better spacing */
  border-radius: 4px;
  padding: 15px; /* Increased padding for better aesthetics */
  box-shadow: none;
  border: none;
}

.track-name, .artist-name {
  font-size: 1.2rem; /* Slightly larger font for better readability on large screens */
}

.artist-name {
  color: #BBBBBB; 
}

.no-tracks {
  font-size: 1rem;
  color: #AAAAAA;
  font-style: italic;
  text-align: center;
}

@media (max-width: 600px) {
  .improved-playlist-card {
    padding: 0 5px; 
    max-width: none; /* No max width for small screens */
  }

  .track-name, .artist-name {
    font-size: 0.9rem; /* Smaller font size for small screens */
  }

  .track-card {
    margin-bottom: 10px; /* Smaller margin for small screens */
    padding: 10px; /* Smaller padding for small screens */
  }
}
</style>
