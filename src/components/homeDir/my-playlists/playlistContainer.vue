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
    },
    methods : {
      closeModal() {
      this.$emit('closeModal');
    }
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
      <div class="playlist-container">
        <div v-if="loading">Loading playlists...</div>
        <div v-else-if="error">Error: {{ error }}</div>
        <div v-else-if="playlists.length === 0">No playlists found.</div>
        <div v-else>
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
    padding: 1rem;
    width: 80%;
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
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

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #d6cee4;
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
    max-width: 800px;
    margin: 0 auto;
  }
  </style>