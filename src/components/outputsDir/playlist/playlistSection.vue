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
    <v-list dense v-if="playlist && playlist.length">
      <v-list-item class="song-item" v-for="(song, index) in playlist" :key="index">
        <!-- Song Details -->
        <div class="details">
          <v-list-item-title class="song-title">{{ song.title }}</v-list-item-title>
          <v-list-item-subtitle class="song-artist">{{ song.artist }}</v-list-item-subtitle>
        </div>
        <!-- Icons -->
        <div class="icon-container">
          <v-btn icon @click="canSwap && swapSong(index)">
            <font-awesome-icon :icon="['fas', 'redo']" :class="{ 'disabled': !canSwap }" />
          </v-btn>
          <v-btn icon @click="playSongPreview(song)">
            <v-icon>mdi-play-circle-outline</v-icon>
          </v-btn>
        </div>
      </v-list-item>
    </v-list>
    <div v-else class="empty-playlist">No songs available. Please generate a playlist.</div>
  </v-card>
</template>

<style scoped>
.playlist-section {
  max-width: 800px;
  margin: auto;
  width: 100%;
}

.song-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.details {
  flex-grow: 1;
}

.song-title, .song-artist {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.icon-container {
  display: flex;
  gap: 10px;
}

.redo-icon.disabled, .spotify-icon {
  color: #ccc;
  cursor: not-allowed;
}

.empty-playlist {
  text-align: center;
  color: #bbb;
  padding: 3rem;
}
</style>
