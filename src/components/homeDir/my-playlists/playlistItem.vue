<!-- src\components\homeDir\my-playlists\playlistItem.vue -->
<template>
    <div class="playlist-item">
      <h3>{{ playlist.name }}</h3>
      <ul>
        <li v-for="(song, index) in playlist.details" :key="index">
          {{ song.title }} - {{ song.artist }} ({{ song.releaseYear }})
        </li>
      </ul>
      <p>Created at: {{ formatDate(playlist.createdAt) }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      playlist: {
        type: Object,
        required: true
      }
    },
    methods: {
      formatDate(timestamp) {
        return new Date(timestamp.seconds * 1000).toLocaleString();
      }
    }
  }
  </script>
  
  <style scoped>
.playlist-item {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.playlist-item h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.playlist-item ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.playlist-item li {
  margin-bottom: 5px;
}

.playlist-item p {
  margin-top: 10px;
  font-size: 14px;
  color: #888;
}
</style>