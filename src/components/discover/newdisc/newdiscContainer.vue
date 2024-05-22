<!-- src/components/discover/newdisc/newdiscContainer.vue -->
<script>
import { useDiscoverStore } from '@/stores/useDiscoverStore';
import { computed, onMounted, ref } from 'vue';
import Masonry from 'vue-masonry-css';

export default {
  name: 'newdiscContainer',
  components: {
    Masonry
  },
  setup(props, { emit }) {
    const discoverStore = useDiscoverStore();
    const newDiscoveries = computed(() => discoverStore.newDiscoveries);
    const visiblePlaylists = ref([]);

    // Function to pick 5 random playlists
    const updateVisiblePlaylists = () => {
      if (newDiscoveries.value.length > 5) {
        const shuffled = newDiscoveries.value.sort(() => 0.5 - Math.random());
        visiblePlaylists.value = shuffled.slice(0, 5);
      } else {
        visiblePlaylists.value = newDiscoveries.value;
      }
    };

    const showModal = (playlist) => {
      emit('show-modal', playlist);
    };

    onMounted(async () => {
      await discoverStore.fetchNewDiscoveries();
      updateVisiblePlaylists(); // Initial population of visible playlists
    });

    return {
      visiblePlaylists,
      showModal,
      updateVisiblePlaylists, // Expose this method to allow re-triggering from the template
    };
  },
};
</script>

<template>
  <div class="newdisc-container" v-if="visiblePlaylists.length">
    <div class="grid-container">
      <v-card
        class="playlist-line"
        v-for="(playlist, index) in visiblePlaylists"
        :key="index"
        @click="showModal(playlist)"
      >
        <v-card-title>{{ playlist.name }}</v-card-title>
        <v-card-subtitle>
          by {{ playlist.creatorName }}
          <span v-if="playlist.displayGenre">in {{ playlist.displayGenre }}</span>
        </v-card-subtitle>
        <v-card-text>
          <!-- Display unique artists -->
          <div v-if="playlist.uniqueArtists && playlist.uniqueArtists.length">
            <strong>Artists: </strong>
            <span v-for="(artist, idx) in playlist.uniqueArtists" :key="`artist-${idx}`">
              {{ artist }}<span v-if="idx < playlist.uniqueArtists.length - 1">, </span>
            </span>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <v-btn color="primary" @click="updateVisiblePlaylists">Refresh Playlists</v-btn>
  </div>
</template>

<style scoped>
.newdisc-container {
  width: 100%;
  margin: 0 auto;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}
.playlist-line {
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  padding: 10px;
  margin-bottom: 10px;
  transition: transform 0.3s;
  cursor: pointer;
}
.playlist-line:hover {
  transform: translateY(-5px);
}
.playlist-name {
  color: #4b8df8;
  font-weight: bold;
}
.creator-name, .display-genre {
  color: #4caf50;
}
.songs, .unique-artists {
  color: #000;
}
.v-btn {
  margin-top: 20px;
}
</style>
