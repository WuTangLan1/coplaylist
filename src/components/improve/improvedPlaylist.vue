<!-- src\components\improve\improvedPlaylist.vue -->
 
  <script>
  export default {
    data() {
      return {
        improvedTracks: [],
      };
    },
  }
  </script>
  
  <template>
    <v-card>
      <v-card-title>Improved Playlist</v-card-title>
      <v-card-text>

        <v-list dense v-if="improvedTracks.length">
          <v-list-item
            v-for="track in improvedTracks"
            :key="track.id"
          >
            <v-list-item-title>{{ track.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ track.artist }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <div v-else></div>
      </v-card-text>
    </v-card>
  </template>
  
  <style scoped>
  </style>
  