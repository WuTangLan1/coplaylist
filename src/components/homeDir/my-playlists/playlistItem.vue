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
      <h3 class="playlist-name">{{ playlist.name }}</h3>
      <button class="toggle-button" @click="toggleOpen">{{ buttonText }}</button>
    </div>
    <div class="playlist-body">
      <ul class="song-list">
        <li v-for="(song, index) in visibleSongs" :key="index" class="song-item">
          <div class="song-info">
            <div class="song-details">
              <div class="song-title">{{ song.title }}</div>
              <div class="song-artist">{{ song.artist }}</div>
            </div>
          </div>
          <div class="song-duration">{{ song.duration }}</div>
        </li>
      </ul>
      <div v-if="hiddenSongs.length > 0 && !this.isOpen" class="blurred-songs">
        <font-awesome-icon icon="ellipsis-h" /> {{ hiddenSongs.length }} more songs...
      </div>
    </div>
  </div>
</template>

<style scoped>
.playlist-card {
  background: linear-gradient(135deg, #f6f6fa, #f4f5f9);
  color: rgb(0, 0, 0);
  padding: 1rem;
  margin: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  max-height: 400px;
}

.playlist-card.open {
  max-height: 800px;
}

.playlist-card:hover {
  transform: translateY(-5px);
}

.playlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-right: 0.3rem;
}

.playlist-header h3 {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #333333;
  text-decoration: underline;
}

.created-at {
  font-size: 14px;
  color: #000000;
}

.song-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.song-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease;
}

.song-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.song-info {
  display: flex;
  align-items: center;
}

.song-details {
  display: flex;
  flex-direction: column;
}

.song-title {
  font-size: 16px;
  font-weight: bold;
  color: #000000;
}

.song-artist {
  font-size: 14px;
  color: #000000;
}

.song-duration {
  font-size: 14px;
  color: #000000;
}

.blurred-songs {
  margin-top: 10px;
  color: #000000;
  font-style: italic;
  position: relative;
}

.playlist-footer {
  margin-top: 20px;
  text-align: right;
}

.toggle-button {
  background-color: #51a36e;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 10px;
  margin-bottom: 0.5rem;
}

.toggle-button:hover {
  background-color: #1ED760;
}
</style>