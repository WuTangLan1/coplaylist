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
  <v-card>
    <v-card-title>Improved Playlist</v-card-title>
    <v-card-text>
      <v-list dense v-if="improveStore.improvedTracks.length">
        <v-list-item
          v-for="(track, index) in improveStore.improvedTracks"
          :key="index"
        >
          <v-list-item-title>{{ track.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ track.artist }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <div v-else>No improved tracks available.</div>
    </v-card-text>
  </v-card>
</template>

  <style scoped>
  </style>
  