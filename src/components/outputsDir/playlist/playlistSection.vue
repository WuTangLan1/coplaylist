<!-- src\components\outputsDir\playlist\playlistSection.vue -->

<script>
export default {
  props: {
    playlist: {
      type: Array,
      default: () => []  
    }
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
    margin-bottom: 1.5rem;
    border: 1px solid #ccc; 
    border-radius: 0.8rem;
    color: #fff;
    background-color: rgb(255, 247, 247);
  }

.playlist-title {
  font-weight: bold;
  margin-bottom: 2rem;
}

.song-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.song-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.song-index {
  min-width: 2rem;
  color: #000000;
}

.song-details {
  flex-grow: 1;
}

.song-name {
  font-weight: bold;
}

.song-artist {
  font-size: 0.9em;
  color: #000000;
}

.song-year {
  color: #000000;
}

.empty-playlist {
  text-align: center;
  color: #b3b3b3;
}
</style>