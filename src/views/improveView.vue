<!-- src\views\improveView.vue -->
<script>
import UploadedPlaylist from '@/components/improve/uploadedPlaylist.vue'
import ImprovedPlaylist from '@/components/improve/improvedPlaylist.vue'

export default {
  components: {
    UploadedPlaylist,
    ImprovedPlaylist
  },
  data() {
    return {
      playlistUploaded: false,  
    };
  },
  methods: {
    setPlaylistUploaded(status) {
      this.playlistUploaded = status;
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
          <improved-playlist />
        </v-col>
      </v-row>
    </v-container>
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

  