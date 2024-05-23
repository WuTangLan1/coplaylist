<!-- src\components\discover\toprated\topratedContainer.vue -->
<script>
import { useDiscoverStore } from '@/stores/useDiscoverStore';
import { computed, onMounted, ref, watch, onUnmounted } from 'vue';

export default {
  name: 'topratedContainer',
  setup(props, { emit }) {
    const discoverStore = useDiscoverStore();
    const topRatedPlaylists = computed(() => discoverStore.topRatedPlaylists.slice(0, 10));
    const currentPage = ref(1);
    const totalPages = computed(() => Math.ceil(topRatedPlaylists.value.length / 5));

    // Watch for playlist updates and force a re-render by changing keys
    const updateCount = ref(0);

    const rotatePages = () => {
      clearInterval(intervalId); 
      const nextPage = currentPage.value >= totalPages.value ? 1 : currentPage.value + 1;
      currentPage.value = nextPage;
      updateCount.value++; // Increase update count to force key change
    };

    let intervalId;

    onMounted(async () => {
      await discoverStore.fetchTopRatedPlaylists(10);
      console.log(discoverStore.topRatedPlaylists); // Check for IDs here
      intervalId = setInterval(rotatePages, 10000); 
    });

    onUnmounted(() => {
      clearInterval(intervalId); 
    });

    const showModal = (playlist) => {
      emit('show-modal', playlist);
    };

    return {
      topRatedPlaylists,
      currentPage,
      changePage: rotatePages,
      showModal,
      updateCount
    };
  },
};
</script>

<template>
  <div class="toprated-container">
    <transition-group name="playlist-transition" tag="div" class="playlist-wrapper">
      <v-card
          class="playlist-line"
          v-for="(playlist, index) in topRatedPlaylists.slice((currentPage - 1) * 5, currentPage * 5)"
         :key="`toprated-${playlist.id}-${updateCount}`"
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
          <div v-if="playlist.songs && playlist.songs.length" class="artist-container">
            <strong>Songs:</strong>
            <span v-for="(song, idx) in playlist.songs" :key="`song-${idx}`">
              {{ song }}<span v-if="idx < playlist.songs.length - 1">, </span>
            </span>
          </div>
        </v-card-text>
      </v-card>
    </transition-group>
    <div class="pagination-dots">
      <span v-for="page in Math.ceil(topRatedPlaylists.length / 5)" :key="page"
            :class="['dot', { 'active-dot': page === currentPage }]"
            @click="changePage(page)"></span>
    </div>
  </div>
</template>

<style scoped>
.toprated-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
}

.playlist-wrapper {
  position: relative;
}

.playlist-line {
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  position: relative;
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
  background-color: #9932ad;
  border-radius: 50%;
  display: inline-block;
  margin: 0 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.active-dot {
  transform: scale(1.5);
  background-color: #4f035e;
}

.playlist-transition-enter-active, .playlist-transition-leave-active {
  transition: opacity 1s ease-in-out;
}

.playlist-transition-enter-from, .playlist-transition-leave-to {
  opacity: 0;
}

.playlist-transition-enter-to, .playlist-transition-leave-from {
  opacity: 1;
}
</style>
