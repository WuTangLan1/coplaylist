<!-- src\components\outputsDir\playlist\playlistSection.vue -->

<script>
export default {
  props: {
    playlist: {
      type: Array,
      required: true
    }
  }
};
</script>

<template>
  <div class="playlist-section">
    <h2>Generated Playlist</h2>
    <ol v-if="playlist && playlist.length">
      <li v-for="(song, index) in playlist" :key="index">
        <strong>{{ song.title }}</strong> - {{ song.artist }} : {{ song.releaseYear }}
      </li>
    </ol>
    <p v-else>No songs available. Please generate a playlist.</p>
  </div>
</template>
   
  <style scoped>
  .playlist-section {
    margin-bottom: 1.5rem;
  }
  
  .playlist-section h2 {
    color: #333;
    font-size: clamp(22px, 5vw, 28px);
    margin-bottom: 1rem;
  }
  
  .playlist-section ol {
    list-style: none;
    padding: 0;
  }
  
  .playlist-section li {
    margin-bottom: 0.5rem;
  }
  </style>
  