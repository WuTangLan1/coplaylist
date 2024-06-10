<!-- src\components\improve\uploadedPlaylist.vue -->
<script>
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  props: ['tracks'],
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
  methods: {
    loginToSpotifyForPlaylists() {
      const baseUrl = process.env.VUE_APP_API_BASE_URL;
      window.location.href = `${baseUrl}/auth/spotify/login?state=fetch-playlists`;
    },
    improvePlaylist() {
      if (!this.tracks.length) return; 
      const baseUrl = process.env.VUE_APP_API_BASE_URL;
      this.$emit(baseUrl,'/improve-playlist', this.tracks);
    },

  },
};
</script>

<template>
  <v-card class="playlist-card">
    <v-card-title class="header">Uploaded Playlist</v-card-title>
    <v-btn @click="loginToSpotifyForPlaylists" class="upload-btn">
      <v-icon>mdi-upload</v-icon> Upload Playlist
    </v-btn>
    <div class="track-list">
      <div v-if="tracks && tracks.length > 0">
        <div v-for="track in tracks" :key="track.track.id" class="track-item">
          <span class="track-name">{{ track.track.name }}</span> by <span class="artist-name">{{ track.track.artists[0].name }}</span>
        </div>
      </div>
      <div v-else class="no-tracks">No tracks available</div>
    </div>
    <div class="button-container">
      <v-btn
        class="gen-btn"
        :disabled="!authStore.isAuthenticated || (authStore.user && authStore.user.tokens < 1) || !authStore.user.email_verified|| !tracks.length"
        @click="improvePlaylist"
      >
        <v-icon>mdi-check</v-icon> Improve this playlist
        <img src="@/assets/images/header/tokens.png" alt="Token" class="token-icon">
      </v-btn>
      <v-tooltip
        v-if="!authStore.isAuthenticated || !authStore.user.email_verified || (authStore.user && authStore.user.tokens < 1)"
        bottom
      >
        <span v-if="!authStore.isAuthenticated">Please log in to improve the playlist.</span>
        <span v-if="authStore.user && authStore.user.tokens < 1">Insufficient tokens to improve the playlist.</span>
        <span v-if="authStore.user && !authStore.user.email_verified">Please verify your email to improve the playlist.</span>
      </v-tooltip>
    </div>
  </v-card>
</template>

<style scoped>
.playlist-card {
  display: flex;
  flex-direction: column;
  background-color: #2D2F48;
  color: #FFF;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  max-height: 60vh;
  overflow-y: auto;
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
  display: flex;
  align-items: center;
}

.upload-btn v-icon {
  margin-right: 8px;
}

.track-list {
  margin-top: 20px;
  flex-grow: 1;
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

.button-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.upload-btn {
  align-self: flex-start;
  background-color: #4CAF50;
  color: white;
  display: flex;
  align-items: center;
  margin: 10px 0;
  max-width: 200px;
}

.upload-btn v-icon {
  margin-right: 8px;
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
  align-items: center;
}

.gen-btn:disabled {
  background-color: #7a7a7a; 
  color: #cccccc; 
  cursor: not-allowed;
  opacity: 0.6; 
}


.gen-btn:hover {
  background-color: #66138c;
}

.gen-btn v-icon {
  margin-right: 8px;
}

.token-icon {
  width: 20px;
  height: auto;
  margin-left: 10px;
}
</style>
