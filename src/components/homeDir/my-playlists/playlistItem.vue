<!-- src\components\homeDir\my-playlists\playlistItem.vue -->
<script>
export default {
  props: {
    playlist: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    visibleSongs() {
      return this.isOpen ? this.playlist.details : this.playlist.details.slice(0, 3);
    },
    hiddenSongs() {
      return this.playlist.details.slice(3);
    },
    buttonText() {
      return this.isOpen ? 'Close' : 'Open';
    }
  },
  methods: {
    formatDate(timestamp) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    },
    toggleOpen() {
      this.isOpen = !this.isOpen;
    }
  }
}
</script>


<template>
  <div class="playlist-card" :class="{ 'open': isOpen }">
    <div class="playlist-header">
      <h3>{{ playlist.name }}</h3>
      <p class="created-at"><font-awesome-icon icon="far fa-calendar-alt" /> {{ formatDate(playlist.createdAt) }}</p>
    </div>
    <div class="playlist-body">
      <ul class="song-list">
        <li v-for="(song, index) in visibleSongs" :key="index">
          <font-awesome-icon icon="fas fa-music" /> {{ song.title }} - {{ song.artist }}
        </li>
      </ul>
        <div class="playlist-footer">
          <button class="toggle-button" @click="toggleOpen">{{ buttonText }}</button>
        </div>
    </div>
  </div>
</template>

<style scoped>
.playlist-card {
  background: linear-gradient(135deg, #655ea7, #411f81);
  color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  max-height: 220px;
}

.playlist-card.open {
  max-height: 420px; 
}

.playlist-card:hover {
  transform: translateY(-5px);
}

.playlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.playlist-header h3 {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.created-at {
  font-size: 14px;
  color: #b3b3b3;
}

.song-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.song-list li {
  margin-bottom: 10px;
  color: #b3b3b3;
}

.blurred-songs {
  color: #b3b3b3;
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

.playlist-footer {
  margin-top: 20px;
  text-align: right;
}

.toggle-button {
  background-color: #1DB954;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 10px;
}

.toggle-button:hover {
  background-color: #1ED760;
}
</style>