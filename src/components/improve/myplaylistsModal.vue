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
    }
  }
}
</script>

<template>
  <v-dialog v-model="showModal" persistent max-width="500px" max-height="500px">
    <v-card>
      <v-card-title class="headline">Your Spotify Playlists</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <!-- Replace v-list-item with v-card for each playlist -->
            <v-col cols="12" sm="6" md="4" v-for="playlist in playlists" :key="playlist.id">
              <v-card outlined class="mb-2">
                <v-card-title>{{ playlist.name }}</v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
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
