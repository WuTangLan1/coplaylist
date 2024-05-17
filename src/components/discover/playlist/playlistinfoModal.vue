<!-- src\components\discover\playlist\playlistinfoModal.vue -->
<script>
export default {
  name: "PlaylistInfoModal",
  data() {
    return {
      spotifyToken: null, 
      currentAudio: null,  
      baseUrl: process.env.VUE_APP_API_BASE_URL
    };
  },
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
    async playSong(songDetail) {
      const parts = songDetail.split(' - ');
      const song = {
        title: parts[0],
        artist: parts.slice(1).join(' - ')  
      };
      console.log('song : ', song)
      if (!song.title || !song.artist) {
        alert("Song details are missing.");
        return;
      }

      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      }

      try {
        const response = await fetch(`${this.baseUrl}/spotify/preview?title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}`);
        if (response.ok) {
          const data = await response.json();
          this.currentAudio = new Audio(data.previewUrl);
          this.currentAudio.play();
        } else {
          console.error('Error fetching preview:', response.status, response.statusText);
          alert('Preview not available for this song.');
        }
      } catch (error) {
        console.error('Error playing song preview:', error);
        alert('An error occurred while trying to play the song preview. Please try again later.');
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
