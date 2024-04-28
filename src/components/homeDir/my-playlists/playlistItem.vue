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
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>