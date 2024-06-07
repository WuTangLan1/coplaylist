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
          <v-card class="d-flex align-center" color="blue lighten-4" flat tile>
            <v-row class="ma-0" align="center" justify="start">
              <!-- Image column -->
              <v-col cols="auto" class="pa-0">
                <v-img
                  :src="require('@/assets/images/explanation-container/improve.png')"
                  class="white--text"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                  contain
                />
              </v-col>
              <v-col class="d-flex align-center justify-start">
                <v-card-title class="text-h4 py-4 px-2 text-white">
                  Improve Your Playlist
                </v-card-title>
              </v-col>
            </v-row>
          </v-card>
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
