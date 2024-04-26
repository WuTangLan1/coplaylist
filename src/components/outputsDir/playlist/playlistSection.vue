<!-- src\components\outputsDir\playlist\playlistSection.vue -->

<script>
import { usePlaylistStore } from '@/stores/usePlaylistStore';
import { computed, onMounted } from 'vue';

export default {
  setup() {
    const playlistStore = usePlaylistStore();
    const playlistName = computed(() => playlistStore.playlistName);
    const playlist = computed(() => playlistStore.playlistDetails);
    return { playlist, playlistName };
  },
  onMounted() {
    console.log('playlist name : ', this.playlistName)
    console.log('playlist name : ', this.playlistDetails)
  }
};
</script>

<template>
  <div class="playlist-section" v-if="playlist && playlist.length">
    <h2 class="playlist-title">{{ playlistName }}</h2>
    <ol>
      <li v-for="(song, index) in playlist" :key="index" class="song-item">
        <div class="song-details">
          <div class="song-name">{{ song.title }}</div>
          <div class="song-artist">{{ song.artist }}</div>
        </div>
        <div class="song-year">{{ song.releaseYear }}</div>
      </li>
    </ol>
  </div>
  <div v-else class="empty-playlist">
    <p>No songs available. Please generate a playlist.</p>
  </div>
</template>

   
  <style scoped>
 .playlist-section {
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  max-width: 80vw;
  max-width: 750px;
}

.playlist-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  border-bottom: 2px solid #507cac;
  padding-bottom: 0.5rem;
}

.song-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 0.5rem 0;
  border-top: 1px solid #eee;
  transition: background-color 0.3s;
}

.song-item:hover {
  background-color: #f8f9fa;
}

.song-details {
  display: flex;
  flex-direction: column;
}

.song-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #507cac;
}

.song-artist {
  font-size: 0.9rem;
  color: #666;
}

.song-year {
  font-size: 0.9rem;
  color: #666;
  margin-left: auto;
}

.empty-playlist {
  text-align: center;
  color: #999;
  padding: 2rem;
}
</style>