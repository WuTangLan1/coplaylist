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
    <h2>Generated Playlist</h2>
    <ol>
      <li v-for="(song, index) in playlist" :key="index">
        <strong>{{ song.title }}</strong> - {{ song.artist }} : {{ song.releaseYear }}
      </li>
    </ol>
  </div>
  <div v-else>
    <p>No songs available. Please generate a playlist.</p>
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
  