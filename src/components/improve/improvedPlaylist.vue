<!-- src\components\improve\improvedPlaylist.vue -->
 
<script>
import { useImproveStore } from '@/stores/useImproveStore';

export default {
  setup() {
    const improveStore = useImproveStore();
    function savePlaylist() {
      console.log("Saving the playlist...");
    }

    function updateSpotifyPlaylist() {
      console.log("Updating Spotify playlist...");
    }

    return { improveStore, updateSpotifyPlaylist, savePlaylist };
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
      <div class="button-container">
        <v-btn color="purple" dark class="action-button" @click="savePlaylist">
          <v-icon left>mdi-content-save</v-icon>
          Save 
        </v-btn>
        <v-btn color="deep-purple" dark class="action-button" @click="updateSpotifyPlaylist">
          <v-icon left>mdi-sync</v-icon>
          Update Spotify 
        </v-btn>
      </div>
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
  max-width: 99vw;
  overflow-x: hidden;
  overflow-y: auto;
}

.track-card {
  margin-top: 20px;
  flex-grow: 1;
  background-color: #2D2F48;
  color: #FFF;
  text-overflow: ellipsis;
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

.button-container {
  display: flex;
  justify-content: space-between; 
  margin-top: 10px;
  padding-bottom: 10px;
}

.action-button {
  flex: 1; 
  margin: 0 5px; 
}

@media (max-width: 600px) {
  .track-card, .track-name, .artist-name {
    padding: 5px; 
    margin-bottom: 5px; 
  }
}

@media (max-width: 600px) {
  .improved-playlist-card {
    padding: 0 5px; 
    max-width: none; 
  }

  .track-name, .artist-name {
    font-size: 0.9rem; 
  }

  .track-card {
    margin-bottom: 10px; 
    padding: 10px; 
  }
}
</style>
