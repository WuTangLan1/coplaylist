<!-- src\components\improve\uploadedPlaylist.vue -->
<script>
import { useAuthStore } from '@/stores/useAuthStore';
   export default {
    setup() {
      const authStore = useAuthStore();
      return {
        authStore
      }
    },
    methods : {
      loginToSpotifyForPlaylists() {
        const baseUrl = process.env.VUE_APP_API_BASE_URL;
        window.location.href = `${baseUrl}/auth/spotify/login?state=fetch-playlists`; 
      }
    }
   }
</script>

<template>
    <v-card>
      <v-card-title>Uploaded Playlist</v-card-title>
      <v-btn @click="loginToSpotifyForPlaylists">Upload Playlist</v-btn>
      
      <button class="gen-btn" :disabled="!authStore.isAuthenticated || (authStore.user && authStore.user.tokens < 1) || !authStore.user.email_verified" @click="uploadPlaylist">
          <img src="@/assets/images/header/tokens.png" alt="Token" class="token-icon"> Generate
        </button>
    </v-card>
  </template>

<style scoped>
.gen-btn {
  background-color: #9c62bd; 
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem; 
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.gen-btn:hover {
  background-color: #66138c; 
}

.float-right {
  margin-left: auto;
  display: block;
}

.token-icon {
  width: 20px; 
  height: auto;
  vertical-align: middle;
}
</style>
