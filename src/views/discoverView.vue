<!-- src\views\discoverView.vue -->
<script>
import RotatingCircle from '@/components/discover/circle/discoverCircle.vue';
import playlistinfoModal from '@/components/discover/playlist/playlistinfoModal.vue';
import { useDiscoverStore } from '@/stores/useDiscoverStore';

export default {
  components: {
    RotatingCircle,
    playlistinfoModal
  },
  data() {
    return {
      selectedPlaylist: null,
      isModalVisible: false,
    };
  },
  computed: {
    newDiscoveries() {
      const discoverStore = useDiscoverStore();
      return discoverStore.newDiscoveries;
    },
    topRatedPlaylists() {
      const discoverStore = useDiscoverStore();
      return discoverStore.topRatedPlaylists;
    },
  },
  methods: {
    hidePlaylistModal() {
      this.selectedPlaylist = null;
      this.isModalVisible = false;
    },
    showPlaylistModal(playlist) {
      if (playlist && playlist.songs) {
        this.selectedPlaylist = playlist;
        this.isModalVisible = true;
      }
    },
  },
};
</script>

<template>
  <div class="discover-view">
    <div class="header-container">
      <img src="@/assets/images/discover/left.png" alt="Left Icon" class="header-icon">
      <h1>Lets go Discover</h1>
      <img src="@/assets/images/discover/right.png" alt="Right Icon" class="header-icon">
    </div>
    <p class="instructions">
      Browse through our top rated generated playlists and some newly generated playlists from our users. <strong>Click</strong> on any of the playlist to bring up more information.
    </p>
    <RotatingCircle :newDiscoveries="newDiscoveries" :topRatedPlaylists="topRatedPlaylists" @show-modal="showPlaylistModal" />
    <PlaylistInfoModal v-if="selectedPlaylist" :playlist="selectedPlaylist" @update:visible="isModalVisible = $event" :visible="isModalVisible" />
  </div>
</template>

<style scoped>
.discover-view {
  padding: 1rem;
  max-width: 100%;
  background: linear-gradient(to bottom, #e5e5ff, #ddedfc);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.header-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
.header-icon {
  width: 50px;
  height: 50px;
  margin: 0 10px;
}
h1 {
  text-align: center;
  flex-grow: 1;
  margin: 0;
  font-size: 1.7rem;
}
.instructions {
  font-size: 0.9rem;
  color: #333;
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
}
</style>
