<!-- src\views\improveView.vue -->
<script>
import UploadedPlaylist from '@/components/improve/uploadedPlaylist.vue';
import ImprovedPlaylist from '@/components/improve/improvedPlaylist.vue';
import MyplaylistsModal from '@/components/improve/myplaylistsModal.vue';
import axios from 'axios';

export default {
  components: {
    UploadedPlaylist,
    ImprovedPlaylist,
    MyplaylistsModal
  },
  props: ['token'],
  data() {
    return {
      playlistUploaded: false,
      playlists: [],
      showModal: false,
      selectedPlaylist: null,
      tracks: [],
      isPlaylistImproved: false  
    };
  },
  methods: {
    fetchPlaylists() {
        if (this.token) {
          axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: { 'Authorization': `Bearer ${this.token}` }
          }).then(response => {
            this.playlists = response.data.items;
            this.showModal = true;  
          }).catch(error => {
            console.error("Error fetching playlists:", error);
          });
        }
      },
      handlePlaylistSelected(playlist) {
        console.log('Playlist selected in parent:', playlist); 
        this.selectedPlaylist = playlist;
        this.fetchTracks(playlist.id);
      },
      fetchTracks(playlistId) {
        console.log('Fetching tracks for:', playlistId);
        axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: { 'Authorization': `Bearer ${this.token}` }
        }).then(response => {
          this.tracks = response.data.items; 
          console.log('Tracks received:', this.tracks);
          this.playlistUploaded = true;
        }).catch(error => {
          console.error("Error fetching tracks:", error);
        });
      },
      handleImprovePlaylist() {
        if (!this.tracks || !this.tracks.length) {
          console.error('No tracks available to improve.');
          return;
        }
        const baseUrl = process.env.VUE_APP_API_BASE_URL;
        axios.post(`${baseUrl.trim()}/improve-playlist`, { tracks: this.tracks })
          .then(response => {
            console.log('Improved Playlist:', response.data);
            this.isPlaylistImproved = true;
          })
          .catch(error => {
            console.error('Failed to improve playlist:', error);
          });
      }
    },
  mounted() {
    this.fetchPlaylists();
  }
}
</script>


<template>
  <v-container class="fill-height">
    <v-row class="align-center justify-center" style="height: 100%;">
      <v-col cols="12">
        <v-card class="d-flex align-center" :style="{ backgroundColor: '#220956' }" flat tile>
          <v-row class="ma-0" align="center" justify="start">
            <v-col cols="auto" class="pa-0">
              <v-img
                :src="require('@/assets/images/explanation-container/improve.png')"
                class="white--text"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="60px"
                contain
              />
            </v-col>
            <v-col class="d-flex align-center justify-start">
              <v-card-title class="text-h4 py-2 px-2 text-white">
                Improve Your Playlist
              </v-card-title>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <uploaded-playlist v-if="!isPlaylistImproved" :tracks="tracks" @playlist-improved="handleImprovePlaylist" />
        <improved-playlist v-else />
      </v-col>
    </v-row>
  </v-container>
  <myplaylists-modal v-if="showModal" :playlists="playlists" @playlist-selected="handlePlaylistSelected" @close="showModal = false" />
</template>
  
  <style>
  .fill-height {
    height: 100%; 
  }
  .align-center {
    align-items: center; 
  }
  .justify-center {
    justify-content: center; 
  }
  </style>

  