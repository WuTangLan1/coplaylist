<!-- src\components\homeDir\my-playlists\playlistItem.vue -->
<script>
export default {
  props: {
    playlist: {
      type: Object,
      required: true
    }
  },
  computed: {
    visibleSongs() {
      return this.playlist.details.slice(0, 3);
    },
    hiddenSongs() {
      return this.playlist.details.slice(3);
    }
  },
  methods: {
    formatDate(timestamp) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    }
  }
}
</script>

<template>
  <div class="playlist-item">
    <h3>{{ playlist.name }}</h3>
    <ul>
      <li v-for="(song, index) in visibleSongs" :key="index">
        <i class="fas fa-music"></i> {{ song.title }} - {{ song.artist }}
      </li>
      <li v-if="hiddenSongs.length > 0" class="blurred-songs">
        <i class="fas fa-ellipsis-h"></i> {{ hiddenSongs.length }} more songs...
      </li>
    </ul>
    <p><i class="far fa-calendar-alt"></i> Created at: {{ formatDate(playlist.createdAt) }}</p>
  </div>
</template>
  
<style scoped>
.playlist-item {
  background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.playlist-item h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.playlist-item li {
  margin-bottom: 5px;
  color: #555;
}

.playlist-item p {
  margin-top: 10px;
  font-size: 14px;
  color: #888;
}

.blurred-songs {
  color: #888;
  font-style: italic;
  position: relative;
}

.blurred-songs::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
}
</style>