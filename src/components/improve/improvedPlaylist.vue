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
  width: 100%; /* Ensure it uses all available width */
  max-width: 100vw; /* Max width should not exceed the viewport width */
  margin: auto; /* Center align the card */
  padding: 0 10px; /* Padding on the sides for some spacing */
  box-sizing: border-box; /* Include padding in width calculation */
  overflow-x: hidden; /* Hide horizontal overflow */
  background-color: #2D2F48; /* Consistent background color */
}

.track-card {
  width: calc(100% - 20px); /* Full width minus padding for inner content */
  background-color: #3A3B55; /* Consistent with other design elements */
  color: #FFF;
  margin-bottom: 5px;
  border-radius: 4px;
  padding: 12px 10px; /* Uniform padding */
  box-shadow: none; /* Removing any shadow for a flat design */
  border: none; /* Removing border for a cleaner look */
}

.track-name {
  font-size: 18px; /* Enhanced readability */
  font-weight: bold;
}

.artist-name {
  font-size: 16px; /* Appropriate font size for subtlety */
  color: #BBBBBB; /* Less focus on artist name */
}

.no-tracks {
  font-size: 16px; /* Consistent font styling for no content */
  color: #AAAAAA;
  font-style: italic;
}
</style>
