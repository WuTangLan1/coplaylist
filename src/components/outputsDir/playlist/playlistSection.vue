<!-- src\components\outputsDir\playlist\playlistSection.vue -->

<script>
import { usePlaylistStore } from '@/stores/usePlaylistStore';
import { computed, onMounted } from 'vue';

export default {
  setup() {
    const playlistStore = usePlaylistStore();
    const playlistName = computed(() => playlistStore.playlistName);
    const playlist = computed(() => playlistStore.playlistDetails);

    onMounted(() => {
      console.log('Playlist Name:', playlistStore.playlistName); // Check if the playlistName is correctly set
    });

    return { playlist, playlistName };
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
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  max-width: 750px;
  margin: 2rem auto;
  overflow: hidden;
}

.playlist-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  padding: 1rem;
  text-align: center;
  background-color: #507cac;
  color: #fff;
}

ol {
  list-style: none;
  padding: 0;
  margin: 0;
}

.song-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e1e1e1;
  transition: background-color 0.3s ease;
}

.song-item:last-child {
  border-bottom: none;
}

.song-item:hover {
  background-color: #f4f4f8;
}

.song-details {
  flex-grow: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.song-name {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-right: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-artist,
.song-year {
  font-size: 0.9rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-year {
  margin-left: auto;
}

.empty-playlist {
  text-align: center;
  color: #999;
  padding: 2rem;
}

@media (max-width: 599px) {
  .playlist-section {
    margin: 1rem;
  }

  .song-name {
    font-size: 0.9rem;
  }

  .song-artist,
  .song-year {
    font-size: 0.8rem;
  }
}
</style>
