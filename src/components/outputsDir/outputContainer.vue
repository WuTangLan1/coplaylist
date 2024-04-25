<!-- src\components\outputsDir\playlist\outputSection.vue -->

<script>
import PlaylistSection from '@/components/outputsDir/playlist/playlistSection.vue';
import ControlSection from '@/components/outputsDir/playlist/controlSection.vue';

export default {
  components: {
    PlaylistSection,
    ControlSection
  },
  props: {
    playlist: {
      type: Array,
      required: true
    }
  },
  methods: {
    regeneratePlaylist() {
      // Implement playlist regeneration logic here
    },
    savePlaylist() {
      // Implement playlist saving logic here
    },
    sharePlaylist() {
      // Implement playlist sharing logic here
    }
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
