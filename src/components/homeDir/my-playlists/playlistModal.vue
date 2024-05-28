<!-- src\components\homeDir\my-playlists\playlistModal.vue -->

<script>
import { useAuthStore } from '@/stores/useAuthStore';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
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
      } else if (this.filterBy === 'alphabetical') {
        return this.playlists.slice().sort((a, b) => a.name.localeCompare(b.name));
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
      try {
        const playlistRef = doc(db, 'playlists', playlistId);
        await deleteDoc(playlistRef);
        this.fetchPlaylists();
      } catch (error) {
        console.error('Error deleting playlist:', error);
      }
    },
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
        <v-btn icon @click="closeModal" class="close-btn">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="filter-container">
        <label for="filter">Filter by:</label>
        <select id="filter" v-model="filterBy">
          <option value="all">All</option>
          <option value="favourited">Favourited</option>
          <option value="date">Date</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
      <div class="playlist-container">
        <div v-if="loading" class="loading-container">
          <img src="@/assets/images/loading/playlist_loading.gif" alt="Loading playlists" class="loading-gif" />
          <img src="@/assets/images/loading/playlist_loading.gif" alt="Loading playlists" class="loading-gif" />
        </div>
        <div v-else-if="error">Error: {{ error }}</div>
        <div v-else-if="filteredPlaylists.length === 0" class="no-playlists-container">
          <p class="no-playlists-message">You don't have any playlists yet.</p>
        </div>
        <div v-else class="show-playlist-container">
          <playlist-item v-for="(playlist, index) in filteredPlaylists" :key="index" :playlist="playlist" @delete="deletePlaylist" class="playlist-item" />
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
    width: auto;
    padding: 0.4rem;
    width: 90%;
    max-width: 90vw;
    max-height: 82vh;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
    animation: dropAnimation 1s ease-in-out forwards;
    position: relative;
    overflow: hidden;
    z-index: 1000;
}

@media (max-width: 850px)
{
  .modal {
    margin-top: 1.5rem;
    max-height: 85vh;
  }
}

@media (max-width: 550px)
{
  .modal {
    margin-top: 2.5rem;
    max-height: 78vh;
  }
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

.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;  
    width: 100%;
}

.loading-gif {
    width: 40%;
    max-width: 100px;
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

.close-btn {
  background-color: #f44336;
  color: #ffffff;
  border-radius: 50%;
  min-width: 26px;
  min-height: 26px;
  max-width: 32px;
  max-height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-btn:hover {
  background-color: #d32f2f;
}

.playlist-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    align-items: start;
    padding: 10px;
    width: 100%;
    max-height: 60vh;
    margin-bottom: 20px;
  
}

.show-playlist-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    align-items: start;
    padding: 10px;
    max-height: 60vh;
    overflow-y: auto;
    width: 100%;
}

.playlist-item {
    flex: 1 0 250px; /* Adjust base width to fit more items in a row */
    max-width: 300px; /* Maximum width to ensure items do not grow too large */
    margin: 5px;  /* Adjust margins as necessary */
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.3);
}


.filter-container {
    display: flex;
    align-items: center;
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

.no-playlists-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    padding: 20px;
}

.no-playlists-icon {
    width: 50%;
    max-width: 200px;
    margin-bottom: 20px;
}

.no-playlists-message {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
}

.create-playlist-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #1db954;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.create-playlist-button:hover {
    background-color: #1ed760;
}
</style>

