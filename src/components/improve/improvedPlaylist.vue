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
  width: 100%; /* Ensure it fills the container but respects padding */
  background-color: #2D2F48; /* Background color as in uploadedPlaylist */
  color: #FFF; /* Text color */
}

.track-card {
  width: 100%; /* Adjust width to match the uploadedPlaylist style */
  background-color: #3A3B55; /* Darker shade for card background */
  margin-bottom: 5px; /* Space between cards */
  border-radius: 4px; /* Smooth edges */
  padding: 12px 20px; /* Padding inside each card */
  box-shadow: none; /* Remove shadow for flat design */
  border: 1px solid #444; /* Subtle border */
}

.track-name {
  font-size: 18px; /* Font size */
  font-weight: bold; /* Bold font for track name */
  margin-bottom: 4px; /* Space between track name and artist name */
}

.artist-name {
  font-size: 16px; /* Smaller font size for artist name */
  color: #BBBBBB; /* Light grey color for artist name */
}

.no-tracks {
  font-size: 16px; /* Consistent font size for no tracks message */
  color: #AAAAAA; /* Grey color */
  font-style: italic; /* Italic style for message */
}
</style>