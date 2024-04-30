<!-- src\components\homeDir\my-playlists\playlistContainer.vue -->
<script>
import { useAuthStore } from '@/stores/useAuthStore';
import {collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/components/fbDir/fbInit';
import PlaylistItem from './playlistItem.vue';

export default {
  components: {
    PlaylistItem
  },
  data() {
    return {
      playlists: [],
      loading: true,
      error: null,
      filterBy: 'all'
    };
  },
  computed: {
    filteredPlaylists() {
      if (this.filterBy === 'all') {
        return this.playlists;
      } else if (this.filterBy === 'favourited') {
        return this.playlists.filter(playlist => playlist.favourited);
      } else if (this.filterBy === 'date') {
        return this.playlists.slice().sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
      }
      return this.playlists;
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    async fetchPlaylists() {
      const authStore = useAuthStore();
      if (authStore.user) {
        try {
          const playlistsCollection = collection(db, 'playlists');
          const q = query(playlistsCollection, where('creatorId', '==', authStore.user.uid));
          const querySnapshot = await getDocs(q);
          this.playlists = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
          this.error = error.message;
        } finally {
          this.loading = false;
        }
      }
    },
    async deletePlaylist(playlistId) {
        console.log('Attempting to delete playlist with ID:', playlistId); // Add this line
        try {
          const playlistRef = doc(db, 'playlists', playlistId);
          await deleteDoc(playlistRef);
          console.log('Playlist deleted successfully');
          this.fetchPlaylists();
        } catch (error) {
          console.error('Error deleting playlist:', error);
        }
      }
  },
  created() {
    this.fetchPlaylists();
  }
}
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">My Playlists</h2>
        <font-awesome-icon icon="times" class="close-icon" @click="closeModal" />
      </div>
      <div class="filter-container">
        <label for="filter">Filter by:</label>
        <select id="filter" v-model="filterBy">
          <option value="all">All</option>
          <option value="favourited">Favourited</option>
          <option value="date">Date</option>
        </select>
      </div>
      <div class="playlist-container">
        <div v-if="loading">Loading playlists...</div>
        <div v-else-if="error">Error: {{ error }}</div>
        <div v-else-if="filteredPlaylists.length === 0">No playlists found.</div>
        <div v-else>
          <playlist-item v-for="(playlist, index) in filteredPlaylists" :key="index" :playlist="playlist" @delete="deletePlaylist"/>
        </div>
      </div>
    </div>
  </div>
</template>


  
  <style scoped>

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
  background: white;
  border-radius: 10px;
  padding: 1rem;
  width: auto;
  max-width: 90vw;
  max-height: 80vh;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow:hidden;
}

  @keyframes dropAnimation {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f3f3f4;
  border-radius: 0.5rem;
}

.modal-title {
  font-size: 32px;
  font-weight: bold;
  color: #000000;
  margin: 0;
}

  .close-icon {
  font-size: 24px;
  cursor: pointer;
}

.playlist-container {
  position: relative; /* Needed to position the gradient overlay correctly */
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  padding: 10px;
  overflow-y: auto; /* Enables scrolling */
  max-height: 65vh; /* Adjust height to prevent overflow outside the modal */
}

/* Gradient overlay at the bottom */
.playlist-container::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px; /* Height of the gradient effect */
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  pointer-events: none; /* Ensures interactions with playlist cards are not blocked */
}

.playlist-card {
  flex: 1 1 350px; /* Flex grow, flex shrink, and flex-basis */
  margin-bottom: 20px; /* Space below each card */
  max-width: 350px; /* Maximum width for each card */
}

@media (min-width: 720px) and (max-width: 1023px) {
  .playlist-container {
    justify-content: space-around; /* Adjusts spacing around items for better fit */
  }
}

@media (min-width: 1024px) {
  .playlist-container {
    justify-content: space-between; /* Evenly distributes space between cards */
  }
}

/* Further responsive settings for smaller screens */
@media (max-width: 719px) {
  .playlist-container {
    flex-direction: column;
    align-items: center;
  }

  .playlist-card {
    width: 90%; /* Wider cards on smaller screens */
  }
}


  .filter-container {
  display: flex;
  align-items: center;
  justify-content: center; /* Center horizontally */
  margin-bottom: 0.3rem;
  margin-top: 0.3rem;
  padding: 0.5rem;
  width: 100%;
}


label {
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
}

select {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
  </style>