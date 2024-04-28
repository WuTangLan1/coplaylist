<!-- src\components\homeDir\my-playlists\playlistContainer.vue -->
<template>
    <div class="playlist-container">
      <h2>My Playlists</h2>
      <div v-if="loading">Loading playlists...</div>
      <div v-else-if="error">Error: {{ error }}</div>
      <div v-else-if="playlists.length === 0">No playlists found.</div>
      <div v-else>
        <playlist-item v-for="(playlist, index) in playlists" :key="index" :playlist="playlist" />
      </div>
    </div>
  </template>
  
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
  
  <style scoped>
  .playlist-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  </style>