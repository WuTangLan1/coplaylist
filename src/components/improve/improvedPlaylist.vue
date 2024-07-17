<!-- src\components\improve\improvedPlaylist.vue -->
<script>
import { useImproveStore } from '@/stores/useImproveStore';

export default {
  setup() {
    const improveStore = useImproveStore();
    let currentAudio = null;

    function savePlaylist() {
      console.log("Saving the playlist...");
    }

    function updateSpotifyPlaylist() {
      console.log("Updating Spotify playlist...");
    }

    async function playSongPreview(song) {
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }

        const baseUrl = process.env.VUE_APP_API_BASE_URL;

        try {
          const response = await fetch(`${baseUrl}/spotify/preview?title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}`);
          console.log("API response:", response);

          if (response.ok) {
            console.log(response)
            const data = await response.json();
            if (data.previewUrl) {
              currentAudio = new Audio(data.previewUrl);
              currentAudio.play();
            } else {
              console.error('Preview URL not available:', data);
              alert('Preview not available for this track.');
            }
          } else {
            console.error('Error fetching preview:', response.status, response.statusText);
            alert(`Error fetching preview: ${response.statusText}`);
          }
        } catch (error) {
          console.error('Error playing song preview:', error);
          alert('An error occurred while trying to play the song preview.');
        }
      }

    return { improveStore, updateSpotifyPlaylist, savePlaylist, playSongPreview };
  }
};
</script>

<template>
  <v-card class="playlist-card">
    <v-card-title class="header">Your Improved Playlist</v-card-title>
    <div class="track-list">
      <div v-for="(track, index) in improveStore.improvedTracks" :key="index" class="track-item">
        <span class="track-name">{{ track.title }}</span> by <span class="artist-name">{{ track.artist }}</span>
        <div class="icons-container">
          <v-icon class="spotify-icon">mdi-spotify</v-icon>
          <v-icon class="delete-icon">mdi-close</v-icon>
        </div>
      </div>
    </div>
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
  </v-card>
  <div v-if="!improveStore.improvedTracks.length" class="no-tracks">No improved tracks available.</div>
</template>

<style scoped>
.playlist-card {
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
  color: #FFFFFF; /* Ensuring text is white */
}

.track-list {
  margin-top: 20px;
}

.track-item {
  padding: 10px 0;
  border-bottom: 1px solid #444;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;
  max-width: 90vw;
}

.track-item:hover {
  background-color: #3A3B55;
}

.track-name, .artist-name {
  font-weight: bold;
}

.artist-name {
  color: #BBBBBB; /* Light gray for artist names */
}

.icons-container {
  display: flex;
  align-items: center;
}

.spotify-icon, .delete-icon {
  margin-left: 8px;
  cursor: pointer;
}

.spotify-icon:hover {
  color: #1DB954; /* Spotify green */
}

.delete-icon:hover {
  color: #D32F2F; /* Red for delete */
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.action-button {
  flex: 1;
  margin: 10px 5px;
  padding: 10px 0;
  font-size: 1rem;
}
</style>
