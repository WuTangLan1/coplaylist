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
  padding: 10px;
  max-width: 98vw;
}

.track-card {
  width: 100%;
  background-color: #2D2F48;
  color: #FFF;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.track-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.track-name {
  font-size: 18px;
  font-weight: bold;
  color: #FFF;
}

.artist-name {
  font-size: 16px;
  color: #BBBBBB;
}

.no-tracks {
  font-size: 16px;
  color: #AAAAAA;
  font-style: italic;
}
</style>