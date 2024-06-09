<!-- src\components\improve\myplaylistsModal.vue -->

<script>
export default {
  data() {
    return {
      showModal: false,
      playlists: []
    };
  },
  methods: {
    fetchPlaylists(token) {
      axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        this.playlists = response.data.items;
      }).catch(error => console.error("Error fetching playlists:", error));
    },
    close() {
      this.showModal = false;
    }
  },
  created() {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (token) {
        this.showModal = true;
        this.fetchPlaylists(token);
      }
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
      <v-col cols="12" md="6" v-if="!playlistUploaded">
        <uploaded-playlist @playlist-uploaded="setPlaylistUploaded(true)" />
      </v-col>
      <v-col cols="12" md="6" v-else>
        <myplaylists-modal :show-modal="showModal" :playlists="playlists" @close="showModal = false"/>
      </v-col>
    </v-row>
  </v-container>
</template>

  
  <style scoped>
  </style>
  