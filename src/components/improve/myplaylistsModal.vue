<!-- src\components\improve\myplaylistsModal.vue -->

<script>
export default {
  props: ['playlists'],
  data() {
    return {
      showModal: true
    };
  },
  methods: {
    close() {
      this.showModal = false;
      this.$emit('close');
    },
    selectPlaylist(playlist) {
      console.log(playlist)
      this.$emit('playlist-selected', playlist);
      this.close();
    }
  }
}
</script>

<template>
  <v-dialog v-model="showModal" persistent max-width="800px" max-height="600px">
    <v-card class="elevation-12" style="background-color: #121212; color: white; border-radius: 8px;">
      <v-card-title class="headline text-center">
        <img src="@/assets/images/music_icons/spotify.png" alt="Spotify" style="height: 24px; margin-right: 8px;">
        Your Spotify Playlists
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="playlist in playlists" :key="playlist.id">
              <v-card
                class="ma-2 elevation-6"
                outlined
                hover
                @click="selectPlaylist(playlist)"
                style="cursor: pointer; transition: box-shadow 0.3s; background-color: #181818; color: white; border-radius: 4px;">
                <v-card-title class="justify-center">{{ playlist.name }}</v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="green darken-1" text @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-card:hover {
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);
}
</style>
