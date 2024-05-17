<!-- src\components\discover\playlist\playlistinfoModal.vue -->
<script>
export default {
  name: "PlaylistInfoModal",
  props: {
    playlist: {
      type: Object,
      default: () => ({}),
    },
    visible: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
    },
    async playSong(song) {
      try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${song.id}/play`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.spotifyToken}`
          }
        });
        if (!response.ok) throw new Error('Failed to play song.');
      } catch (error) {
        console.error('Error playing song:', error);
        alert('Failed to play the song. Please try again.');
      }
    }
  }
};
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <h3>{{ playlist.name }} - {{ playlist.creatorName }}</h3>
        <span class="modal-genre">{{ playlist.displayGenre }}</span>
      </div>
      <ul class="modal-content">
        <li v-for="(song, index) in playlist.songs || []" :key="index" class="song-item">
          <div class="song-details">
              {{ song}}
          </div>
          <div class="song-actions">
            <img class="spotify-icon" src="@/assets/images/music_icons/spotify.png" @click="playSong(song)"></img>
          </div>
        </li>
      </ul>
      <div class="modal-footer">
        <button @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.75);
}

.modal {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
}

.modal-header, .modal-footer {
  background-color: #b3bad6;
  color: rgb(0, 0, 0);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-genre {
  font-size: 1rem;
  color: #000000;
  opacity: 0.9;
}

.modal-content {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
}

.song-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.3s;
}

.song-item:hover {
  background-color: #f4f4f4;
}

.spotify-icon{
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.spotify-icon {
  margin-right: 5px; 
}

.song-details {
  flex-grow: 1;
}

.song-title, .song-artist {
  display: block;
}

.song-title {
  font-size: 1.1rem;
  font-weight: bold;
}

.song-artist {
  font-size: 0.9rem;
  color: #666;
}

.play-icon {
  color: #007bff;
  font-size: 1.5rem;
  cursor: pointer;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
