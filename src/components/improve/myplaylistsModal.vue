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
    <v-dialog v-model="showModal" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">Your Spotify Playlists</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="playlist in playlists" :key="playlist.id">
              <v-list-item-content>
                <v-list-item-title>{{ playlist.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  
  <style scoped>
  </style>
  