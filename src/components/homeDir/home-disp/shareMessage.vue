<!-- src\components\homeDir\home-disp\shareMessage.vue -->
<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="mx-auto" elevation="10" shaped>
          <v-img
            :src="require('@/assets/images/explanation/share.png')"
            alt="Share Playlists"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)"
            height="300px"
          >
            <v-card-title class="fill-height align-end mb-0 px-3 py-2">Store and Share</v-card-title>
          </v-img>
          <v-card-text class="pt-4 pb-3 px-3">
            Save your playlists and playlists created by others to your account, where you can store 
            and share this music with your close friends and family! Don't hog the good music !
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card-title {
  background-color: rgba(0, 0, 0, 0.5);
  color: #FFFFFF;
  font-size: 1.75rem;
}

.v-card-text {
  color: #333333;
  font-size: 1.1rem;
}
</style>
