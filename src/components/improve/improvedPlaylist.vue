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
  background-color: #2D2F48;
  color: #FFF;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  max-height: 60vh;
  overflow-y: auto;
}

.track-card {
  margin-top: 20px;
  flex-grow: 1;
  background-color: #2D2F48;
  color: #FFF;
}

.track-name {
  font-weight: bold;
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
