<!-- src/components/discover/newdisc/newdiscContainer.vue -->
<script>
import { useDiscoverStore } from '@/stores/useDiscoverStore';
import { computed, onMounted, ref } from 'vue';

export default {
  name: 'newdiscContainer',
  setup(props, { emit }) {
    const discoverStore = useDiscoverStore();
    const newDiscoveries = computed(() => discoverStore.newDiscoveries);
    const visiblePlaylists = ref([]);
    const currentPage = ref(1);

    const updateVisiblePlaylists = async () => {
      await discoverStore.fetchNewDiscoveries(24);  // Adjusted to fetch 24 playlists
      visiblePlaylists.value = discoverStore.newDiscoveries;
    };

    const showModal = (playlist) => {
      emit('show-modal', playlist);
    };

    const changePage = (page) => {
      currentPage.value = page;
    };

    onMounted(updateVisiblePlaylists);

    return {
      visiblePlaylists,
      currentPage,
      showModal,
      changePage,
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
        v-for="(playlist, index) in visiblePlaylists.slice((currentPage - 1) * 3, currentPage * 3)"
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
            <strong>Artists:</strong>
            <span v-for="(artist, idx) in playlist.uniqueArtists" :key="`artist-${idx}`">
              {{ artist }}<span v-if="idx < playlist.uniqueArtists.length - 1">, </span>
            </span>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div class="pagination-dots">
      <span v-for="page in 8" :key="page"
            :class="['dot', { 'active-dot': page === currentPage }]"
            @click="changePage(page)"></span>
    </div>
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
  margin-bottom: 10px;
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
  display: flex; 
  align-items: center; 
  white-space: nowrap;
  overflow: hidden; 
  text-overflow: ellipsis;
}

.pagination-dots {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.dot {
  height: 10px;
  width: 10px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin: 0 5px;
  transition: background-color 0.3s, transform 0.3s;
}
.active-dot {
  transform: scale(1.5);
  background-color: #666;
}

</style>
