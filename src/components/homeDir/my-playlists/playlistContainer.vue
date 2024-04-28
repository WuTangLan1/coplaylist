<!-- src\components\homeDir\my-playlists\playlistContainer.vue -->
 
  <script>
  import { useAuthStore } from '@/stores/useAuthStore';
  import { collection, query, where, getDocs } from 'firebase/firestore';
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
        error: null
      };
    },
    async created() {
      const authStore = useAuthStore();
      if (authStore.user) {
        try {
          const playlistsCollection = collection(db, 'playlists');
          const q = query(playlistsCollection, where('creatorId', '==', authStore.user.uid));
          const querySnapshot = await getDocs(q);
          this.playlists = querySnapshot.docs.map(doc => doc.data());
        } catch (error) {
          this.error = error.message;
        } finally {
          this.loading = false;
        }
      }
    }
  }
  </script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="playlist-container">
        <h2>My Playlists</h2>
        <div v-if="loading">Loading playlists...</div>
        <div v-else-if="error">Error: {{ error }}</div>
        <div v-else-if="playlists.length === 0">No playlists found.</div>
        <div class="playlist-grid" v-else>
          <playlist-item v-for="(playlist, index) in playlists" :key="index" :playlist="playlist" />
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
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background: white;
    border-radius: 10px;
    width: auto;
    max-width: 90vw;
    max-height: 95vh;
    overflow: auto;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
    animation: dropAnimation 1s ease-in-out forwards;
    position: relative;
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

  .playlist-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .playlist-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      grid-gap: 20px;
    }
  </style>