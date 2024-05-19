<!-- src\components\homeDir\home-disp\generateMessage.vue -->
<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="mx-auto" elevation="10" shaped>
          <v-img
            :src="require('@/assets/images/explanation/playlist.png')"
            alt="Artificial Intelligence"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)"
            height="300px"
          >
            <v-card-title class="fill-height align-end mb-0 px-3 py-2">Generate Playlists</v-card-title>
          </v-img>
          <v-card-text class="pt-4 pb-3 px-3">
            Use the latest Artificial Intelligence to curate and personalize your playlists. This technology ensures a unique and satisfying musical experience tailored just for you.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'GenerateMessage',
};
</script>

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

.v-btn {
  text-transform: none; 
}
</style>
