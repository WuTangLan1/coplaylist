<!-- src\views\discoverView.vue -->
<!-- src\views\discoverView.vue -->
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
    showPlaylistModal(playlist) {
      if (playlist) {
        this.selectedPlaylist = playlist;
        this.isModalVisible = true;
      }
    },
  },
};
</script>

<template>
  <div class="discover-view">
    <h1>Discover</h1>
    <div class="section">
      <h2>Top Rated</h2>
      <toprated-container @show-modal="showPlaylistModal" />
    </div>
    <div class="section">
      <h2>Newly Generated</h2>
      <newdisc-container @show-modal="showPlaylistModal" />
    </div>
    <playlist-info-modal v-if="selectedPlaylist" :playlist="selectedPlaylist" :visible.sync="isModalVisible" />
  </div>
</template>

<style scoped>
.discover-view {
  padding: 1rem;
  max-width: 89vw;
  background: linear-gradient(to bottom, #b3b4ee, #abc7df); /* Light blue gradient background */
  border-radius: 10px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.section {
  margin-bottom: 40px;
}
h1 {
  text-align: center;
}
h2 {
  margin-bottom: 20px;
}
</style>
