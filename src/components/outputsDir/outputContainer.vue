<!-- src\components\outputsDir\playlist\outputSection.vue -->

<script>
// Importing necessary components and stores
import PlaylistSection from '@/components/outputsDir/playlist/playlistSection.vue';
import ControlSection from '@/components/outputsDir/playlist/controlSection.vue';
import { usePlaylistStore } from '@/stores/usePlaylistStore';
import { computed } from 'vue';

export default {
  components: {
    PlaylistSection,
    ControlSection
  },
  setup() {
    const playlistStore = usePlaylistStore();
    const playlist = computed(() => playlistStore.playlistDetails);

    // Define the methods used in your template
    const regeneratePlaylist = () => {
      // Add logic for regenerating the playlist
    };
    const savePlaylist = () => {
      // Add logic for saving the playlist
    };
    const sharePlaylist = () => {
      // Add logic for sharing the playlist
    };

    return { playlist, regeneratePlaylist, savePlaylist, sharePlaylist };
  }
};
</script>


<template>
  <div class="output-container">
    <PlaylistSection :playlist="playlist" />
    <ControlSection @regenerate="regeneratePlaylist" @save="savePlaylist" @share="sharePlaylist" />
  </div>
</template>

<style scoped>
.output-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: #F4F4F4; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 700px; 
  margin: 0 auto;
  border: 2px solid #507cac; 
  max-height: 75vh;
  overflow-y: auto; 
}
</style>
