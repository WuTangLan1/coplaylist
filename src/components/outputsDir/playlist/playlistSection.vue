<!-- src\components\outputsDir\playlist\playlistSection.vue -->

<script>
import { usePlaylistStore } from '@/stores/usePlaylistStore';
import { computed, ref } from 'vue';

export default {
  setup() {
    const playlistStore = usePlaylistStore();
    const playlist = computed(() => playlistStore.playlistDetails);
    const canSwap = computed(() => playlistStore.getAlternativeSongs().length > 0);

    const baseUrl = process.env.VUE_APP_API_BASE_URL;
    let currentAudio = null;

    async function playSongPreview(song) {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      const response = await fetch(`${baseUrl}/spotify/preview?title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}`);
      if (response.ok) {
        const data = await response.json();
        currentAudio = new Audio(data.previewUrl);
        currentAudio.play();
      } else {
        console.error('Error fetching preview:', response.status, response.statusText);
      }
    }

    const swapSong = (index) => {
      const alternativeSongs = playlistStore.getAlternativeSongs();
      if (canSwap.value && alternativeSongs.length > 0) {
        const randomIndex = Math.floor(Math.random() * alternativeSongs.length);
        const newSong = alternativeSongs[randomIndex];
        playlistStore.playlistDetails[index] = newSong;
        alternativeSongs.splice(randomIndex, 1);
      }
    };

    return {
      playlist,
      canSwap,
      playSongPreview,
      swapSong
    };
  },
};
</script>

<template>
  <v-card class="playlist-section" elevation="2" shaped>
    <v-list v-if="playlist && playlist.length" dense>
      <v-list-item v-for="(song, index) in playlist" :key="index" class="song-item">
        <div class="song-info">
          <div class="song-details">
            <v-list-item-title>{{ song.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ song.artist }}</v-list-item-subtitle>
          </div>
        </div>
        <v-list-item-action class="actions">
          <v-btn icon @click="canSwap && swapSong(index)">
            <v-icon>mdi-redo</v-icon>
          </v-btn>
          <v-btn icon @click="playSongPreview(song)">
            <v-icon>mdi-play-circle-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <div v-else class="empty-playlist">
      No songs available. Please generate a playlist.
    </div>
  </v-card>
</template>


<style scoped>
.playlist-section {
  max-width: 800px;
  margin: 1rem auto;
  width: 100%;
}

.song-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.song-info {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.song-details {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

.release-year {
  padding-left: 16px;
  white-space: nowrap; 
}

.actions {
  flex-shrink: 0; 
  display: flex;
  gap: 10px;
  align-items: flex-end;
  align-self: flex-end;
  align-content: flex-end;
}

.empty-playlist {
  text-align: center;
  color: #bbb;
  padding: 3rem;
}
</style>
