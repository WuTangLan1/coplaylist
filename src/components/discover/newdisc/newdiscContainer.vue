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

    const updateVisiblePlaylists = () => {
      if (newDiscoveries.value.length > 3) { // Changed from 5 to 3
        const shuffled = newDiscoveries.value.sort(() => 0.5 - Math.random());
        visiblePlaylists.value = shuffled.slice(0, 3); // Changed from 5 to 3
      } else {
        visiblePlaylists.value = newDiscoveries.value;
      }
    };


    const showModal = (playlist) => {
      emit('show-modal', playlist);
    };

    onMounted(async () => {
      await discoverStore.fetchNewDiscoveries();
      updateVisiblePlaylists(); 
    });

    return {
      visiblePlaylists,
      showModal,
      updateVisiblePlaylists,
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
        <div class="card-header">
          <v-card-title>{{ playlist.name }}</v-card-title>
          <div class="spotify-icon">
            <img src="@/assets/images/music_icons/spotify.png" alt="Spotify">
            <span>Catch a Taste</span>
          </div>
        </div>
        <div class="card-subtitle">
          <span>by {{ playlist.creatorName }} in {{ playlist.displayGenre }}</span>
          <v-btn small color="blue lighten-2" @click.stop="showMore(playlist)">See More</v-btn>
        </div>
        <v-card-text class="card-text">
          <div v-if="playlist.uniqueArtists && playlist.uniqueArtists.length" class="artist-container">
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
  background: #ffffff;
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
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #8d309f;
  color: white;
  padding: 10px;
  border-radius: 8px;
}
.spotify-icon {
  display: flex;
  align-items: center;
}
.spotify-icon img {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}
.card-subtitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e8e8e8;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px; /* Added margin to create space between sections */
  border-radius: 8px;
}
.card-text {
  background-color: #e8e8e8;
  padding: 10px;
  border-radius: 8px;
}
.artist-container {
  background-color: #d0e0f0;
  padding: 5px;
  border-radius: 8px;
}
</style>
