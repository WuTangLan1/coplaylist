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
  <div class="improved-playlist-card">
    <div v-if="improveStore.improvedTracks.length">
      <v-card
        v-for="(track, index) in improveStore.improvedTracks"
        :key="index"
        class="track-card"
      >
        <v-card-title class="track-name">{{ track.title }}</v-card-title>
        <v-card-subtitle class="artist-name">{{ track.artist }}</v-card-subtitle>
        <!-- Icons container -->
        <div class="icons-container">
          <img
            src="@/assets/images/music_icons/spotify.png"
            alt="Spotify"
            class="spotify-icon"
            @click="playSongPreview(track)"
          >
          <v-icon class="delete-icon">mdi-close</v-icon>
        </div>
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
  background-color: #1E1E2F;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.track-name {
  font-weight: bold;
  font-size: 1.2rem;
  color: #E0E0E0;
  max-width: 70%;
  text-overflow: ellipsis;
}

.artist-name {
  font-size: 1rem;
  color: #CCCCCC;
  margin-bottom: 5px;
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

.v-btn { 
  border: none;
  border-radius: 5px; 
  background-color: #6A1B9A;
  color: #FFFFFF;
}

.action-button {
  flex: 1;
  margin: 10px 5px;
  padding: 10px 0;
  font-size: 1rem;
}

.icons-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 5px; 
}

.spotify-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px; 
}

.delete-icon {
  color: #FF0000;
  cursor: pointer; 
}

.spotify-icon:hover, .delete-icon:hover {
  transform: scale(1.1); 
}

.delete-icon:hover {
  color: #D32F2F; 
}

.spotify-icon {
  transition: transform 0.2s ease-in-out;
}

.delete-icon {
  transition: color 0.2s, transform 0.2s ease-in-out;
}

@media(min-width:1000px)
{
  .improved-playlist-card {
    max-height: 59vh;
  }
}

@media (max-width: 600px) {
  .track-name, .artist-name {
    font-size: 1rem; 
  }

  .action-button {
    padding: 8px 0;
    font-size: 0.9rem;
  }

  .improved-playlist-card {
    padding: 5px;
    max-width: 100vw;
  }

  .track-card {
    margin-bottom: 15px;
  }
}

</style>
