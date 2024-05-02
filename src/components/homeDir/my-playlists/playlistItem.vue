<!-- src\components\homeDir\my-playlists\playlistItem.vue -->
<script>
import confirmdelModal from './confirmdelModal.vue'
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '@/components/fbDir/fbInit';

export default {
  components : {
    confirmdelModal
  },
  props: {
    playlist: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      showConfirmModal: false
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
    },
    async toggleFavourite() {
      try {
        const newFavourited = !this.playlist.favourited;
        const playlistRef = doc(db, 'playlists', this.playlist.id);
        await updateDoc(playlistRef, { favourited: newFavourited });
        this.playlist.favourited = newFavourited; // Update local state
      } catch (error) {
        console.error('Error updating favourited status:', error);
      }
    },
    openConfirmModal() {
      this.showConfirmModal = true;
    },
    closeConfirmModal() {
      this.showConfirmModal = false;
    },
    confirmDelete() {
      this.$emit('delete', this.playlist.id);
      this.showConfirmModal = false;
    },
    exportToSpotify() {
      // Add logic to export the playlist to Spotify
    }
  }
}
</script>

<template>
  <div class="playlist-card" :class="{ 'open': isOpen }">
    <div class="playlist-header">
      <h3 class="playlist-name">{{ playlist.name }}</h3>
      <font-awesome-icon 
          :icon="[playlist.favourited ? 'fas' : 'far', 'heart']" 
          class="heart-icon" 
          @click="toggleFavourite"
        />
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
        </li>
      </ul>
      <div v-if="isOpen" class="playlist-actions">
        <button class="action-button remove-button" @click="openConfirmModal">Remove</button>
        <button class="action-button export-button" @click="exportToSpotify">Export to Spotify</button>
      </div>
      <div v-if="hiddenSongs.length > 0 && !this.isOpen" class="blurred-songs">
        <font-awesome-icon icon="ellipsis-h" /> {{ hiddenSongs.length }} more songs...
      </div>
    </div>
    <confirmdelModal v-if="showConfirmModal" @close="closeConfirmModal" @confirm="confirmDelete" />
  </div>
</template>

<style scoped>
.playlist-card {
  background: linear-gradient(135deg, #f6f6fa, #f4f5f9);
  color: rgb(0, 0, 0);
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  max-height: 400px;
}

.playlist-card.open {
  max-height: 1200px;
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
  margin: 0;
  color: #333333;
}

.playlist-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.action-button {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  margin-right: 10px;
}

.remove-button:hover {
  background-color: #e60000;
}

.export-button {
  background-color: #1db954;
  color: white;
  border: none;
}

.export-button:hover {
  background-color: #1ed760;
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
  border-bottom: 1px solid #eee;
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
  background-color: #6780b9;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 10px;
  margin-bottom: 0.5rem;
}

.toggle-button:hover {
  background-color: #2b1783;
}

.heart-icon {
    cursor: pointer;
    color: rgb(243, 0, 0);
    height: 10%;
    width: 10%;
    font-size: 24px;
  }

  .fas.fa-heart { /* Filled heart when favourited */
    color: red;
  }

</style>