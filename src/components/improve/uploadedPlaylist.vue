<!-- src\components\improve\uploadedPlaylist.vue -->
 
<!-- src/components/improve/uploadedPlaylist.vue -->
<script>
import { useImproveStore } from '@/stores/useImproveStore';

export default {
  setup() {
    const improveStore = useImproveStore();
    return { improveStore };
  },
  methods: {
    async uploadPlaylist() {
      const clientId = process.env.VUE_APP_SPOTIFY_CLIENT_ID;
      console.log(clientId)
      const apiUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';
      const redirectUri = `${apiUrl}/spotify/callback`;
      const scope = 'playlist-read-private';
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
      window.location.href = authUrl;
    },
    async handleSpotifyCallback() {
      const hash = window.location.hash.substr(1);
      const accessToken = new URLSearchParams(hash).get('access_token');
      if (accessToken) {
        await this.improveStore.fetchUserPlaylists(accessToken);
      }
    },
    selectPlaylist(playlist) {
      this.improveStore.setSelectedPlaylist(playlist);
    },
    improvePlaylist() {
      // Logic to start the process of improving the selected playlist
    },
    async mounted() {
        console.log('Spotify Client ID:', process.env.VUE_APP_SPOTIFY_CLIENT_ID);
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');

        if (accessToken) {
            await this.improveStore.fetchUserPlaylists(accessToken);
            this.$router.replace({ query: null });
        }
        },

  },
  mounted() {
    console.log('Spotify Client ID:', process.env.VUE_APP_SPOTIFY_CLIENT_ID);
    if (window.location.hash.includes('access_token')) {
      this.handleSpotifyCallback();
    }
  },
};
</script>

<template>
    <v-card>
      <v-card-title>Uploaded Playlist</v-card-title>
      <v-card-text>
        <v-btn @click="uploadPlaylist">Upload Playlist</v-btn>
        <v-list dense v-if="improveStore.selectedPlaylist">
          <v-list-item
            v-for="track in improveStore.selectedPlaylist.tracks.items"
            :key="track.track.id"
          >
            <v-list-item-title>{{ track.track.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ track.track.artists[0].name }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <div v-else-if="improveStore.userPlaylists.length > 0">
          <v-list dense>
            <v-list-item
              v-for="playlist in improveStore.userPlaylists"
              :key="playlist.id"
              @click="selectPlaylist(playlist)"
            >
              <v-list-item-title>{{ playlist.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
        <div v-else>No playlists available</div>
      </v-card-text>
      <v-btn
        @click="improvePlaylist"
        class="gen-btn float-right"
        :disabled="!improveStore.selectedPlaylist"
      >
        Improve Playlist
      </v-btn>
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
</style>
