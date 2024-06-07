<!-- src\components\improve\uploadedPlaylist.vue -->
 
  <script>
  export default {
    data() {
      return {
        playlist: null,
      };
    },
    methods: {
      uploadPlaylist() {
        console.log("Upload functionality to be implemented");
      }
    }
  }
  </script>

<template>
    <v-card>
      <v-card-title>Uploaded Playlist</v-card-title>
      <v-card-text>
        <v-btn @click="uploadPlaylist">Upload Playlist</v-btn>
        <v-list dense v-if="playlist">
          <v-list-item
            v-for="track in playlist.tracks"
            :key="track.id"
          >
            <v-list-item-title>{{ track.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ track.artist }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <div v-else>No playlist loaded</div>
      </v-card-text>
    </v-card>
  </template>
  
  <style scoped>
  </style>
  