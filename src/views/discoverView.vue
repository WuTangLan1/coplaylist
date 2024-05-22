<!-- src/views/discoverView.vue -->
<script>
import topratedContainer from "@/components/discover/toprated/topratedContainer.vue";
import newdiscContainer from "@/components/discover/newdisc/newdiscContainer.vue";
import PlaylistInfoModal from "@/components/discover/playlist/playlistinfoModal.vue";

export default {
  components: {
    topratedContainer,
    newdiscContainer,
    PlaylistInfoModal,
  },
  data() {
    return {
      selectedPlaylist: null,
      isModalVisible: false,
    };
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
      <h1>Let's go Discover</h1>
      <img src="@/assets/images/discover/right.png" alt="Right Icon" class="header-icon">
    </div>
    <p class="instructions">
      Browse through our top rated generated playlists and some newly generated playlists from our users. <strong>Click</strong> on any of the playlists to bring up more information.
    </p>
    <div class="section">
      <div class="title-bar">
        <h2>Top Rated</h2>
        <img src="@/assets/images/discover/toprated.png" alt="Top Rated" class="title-icon">
      </div>
      <toprated-container @show-modal="showPlaylistModal" />
    </div>
    <div class="section">
      <div class="title-bar">
        <h2>Newly Generated</h2>
        <img src="@/assets/images/discover/newdiscoveries.png" alt="New Discoveries" class="title-icon">
      </div>
      <newdisc-container @show-modal="showPlaylistModal" />
    </div>
    <playlist-info-modal v-if="selectedPlaylist" :playlist="selectedPlaylist" @update:visible="isModalVisible = $event" :visible="isModalVisible" />
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
.section {
  margin-bottom: 40px;
}
h2 {
  margin-bottom: 20px;
}
.instructions {
  font-size: 0.9rem;
  color: #333;
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
}
.title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.title-icon {
  width: 32px;
  height: 32px;
}
</style>
