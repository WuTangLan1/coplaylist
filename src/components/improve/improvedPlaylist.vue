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
  <v-card class="improved-playlist-card">
    <v-card-title class="header">Improved Playlist</v-card-title>
    <div class="track-list">
      <v-list dense v-if="improveStore.improvedTracks.length">
        <v-list-item
          v-for="(track, index) in improveStore.improvedTracks"
          :key="index"
          class="track-item"
        >
          <v-list-item-content>
            <v-list-item-title class="track-name">{{ track.title }}</v-list-item-title>
            <v-list-item-subtitle class="artist-name">{{ track.artist }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div v-else class="no-tracks">No improved tracks available.</div>
    </div>
  </v-card>
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

.header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.track-list {
  margin-top: 20px;
  flex-grow: 1;
}

.track-item {
  padding: 10px 0;
  border-bottom: 1px solid #444;
  cursor: pointer;
  transition: background-color 0.3s;
}

.track-item:hover {
  background-color: #3A3B55;
}

.track-name {
  font-weight: bold;
}

.artist-name {
  color: #BBBBBB;
}
</style>
