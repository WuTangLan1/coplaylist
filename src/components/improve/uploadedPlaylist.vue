<!-- src\components\improve\uploadedPlaylist.vue -->
<script>
import { useAuthStore } from '@/stores/useAuthStore';
   export default {
    props: ['tracks'],
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
  <v-card class="playlist-card">
    <v-card-title class="header">Uploaded Playlist</v-card-title>
    <v-btn @click="loginToSpotifyForPlaylists" class="upload-btn">Upload Playlist</v-btn>
    <div class="track-list">
      <div v-if="tracks && tracks.length > 0">
        <div v-for="track in tracks" :key="track.track.id" class="track-item">
          <span class="track-name">{{ track.track.name }}</span> by <span class="artist-name">{{ track.track.artists[0].name }}</span>
        </div>
      </div>
      <div v-else class="no-tracks">No tracks available</div>
    </div>
    <button class="gen-btn" :disabled="!authStore.isAuthenticated || (authStore.user && authStore.user.tokens < 1) || !authStore.user.email_verified" @click="uploadPlaylist">
      Generate
      <img src="@/assets/images/header/tokens.png" alt="Token" class="token-icon">
    </button>
  </v-card>
</template>

<style scoped>
.playlist-card {
  background-color: #2D2F48;
  color: #FFF;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.upload-btn {
  margin: 10px 0;
  background-color: #4CAF50;
  color: white;
}

.track-list {
  margin-top: 20px;
}

.track-item {
  padding: 10px 0;
  border-bottom: 1px solid #444;
  cursor: pointer;
  transition: background-color 0.3s;
}

.track-item:hover {
  background-color: #3A3B55;
}

.track-name {
  font-weight: bold;
}

.artist-name {
  color: #BBBBBB;
}

.no-tracks {
  color: #AAAAAA;
  font-style: italic;
}

.gen-btn {
  background-color: #9c62bd;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gen-btn:hover {
  background-color: #66138c;
}

.token-icon {
  width: 20px;
  height: auto;
  margin-left: 10px;
}

.float-right {
  margin-left: auto;
  display: block;
}
</style>
