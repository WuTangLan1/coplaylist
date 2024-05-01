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
  }
};
</script>
<template>
  <div class="playlist-section" v-if="playlist && playlist.length">
    <ol>
      <li v-for="(song, index) in playlist" :key="index" class="song-item">
        <div class="song-details">
          <div class="song-name">{{ song.title }}</div>
          <div class="song-artist">{{ song.artist }}</div>
        </div>
        <div class="song-year">{{ song.releaseYear }}</div>
        <img src="@/assets/images/music_icons/PlayMe.png" alt="Play" class="play-icon">
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
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  margin: 1rem;
  overflow-y: auto;
}

ol {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.song-item {
  display: flex;
  justify-content: space-between; /* Ensure items are spaced across the main axis */
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e6e6e6;
  transition: background-color 0.2s ease-in-out;
}

.song-details {
  display: flex;
  flex-direction: column;
  flex: 1; /* Takes remaining space pushing the icon to the far right */
}

.song-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
}

.song-artist, .song-year {
  font-size: 1.1rem;
  color: #607D8B;
}

.song-year {
  color: #777;
  margin-right: 1rem; /* Ensures space between the date and the icon */
}

.play-icon {
  width: 24px; /* Set appropriate size for the icon */
  height: 24px; /* Maintain aspect ratio */
}

.empty-playlist {
  text-align: center;
  color: #bbb;
  padding: 3rem;
}

@media (max-width: 768px) {
  .song-year {
    align-self: center; /* Center the date on smaller screens */
  }

  .song-name, .song-artist {
    font-size: 1rem;
  }
}
</style>
