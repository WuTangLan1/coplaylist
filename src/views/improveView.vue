<!-- src\views\improveView.vue -->
  
  <script>
  import UploadedPlaylist from '@/components/improve/uploadedPlaylist.vue'
  import ImprovedPlaylist from '@/components/improve/improvedPlaylist.vue'
  
  export default {
    components: {
      UploadedPlaylist,
      ImprovedPlaylist
    }
  }
  </script>

<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h4 py-4">Improve Your Playlist</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <uploaded-playlist />
        </v-col>
        <v-col cols="12" md="6">
          <improved-playlist />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <style scoped>
  </style>
  