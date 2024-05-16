<!-- src\components\discover\toprated\topratedContainer.vue -->
<script>
import { useDiscoverStore } from '@/stores/useDiscoverStore';
import { onMounted, computed } from 'vue';

export default {
  name: 'toprated-Container',
  setup() {
    const discoverStore = useDiscoverStore();

    onMounted(async () => {
      await discoverStore.fetchTopRatedPlaylists();
    });

    const topRatedPlaylists = computed(() => discoverStore.topRatedPlaylists);

    return {
      topRatedPlaylists,
    };
  },
};
</script>

<template>
  <div class="toprated-container">
    <div v-for="(playlist, index) in topRatedPlaylists" :key="index" class="playlist-line">
      <span class="playlist-name">{{ playlist.name }}</span> by 
      <span class="creator-name">{{ playlist.creatorName }}</span> in 
      <span class="display-genre">{{ playlist.displayGenre }}</span>:
      <span class="songs">
        <template v-for="(song, idx) in playlist.songs" :key="idx">
          {{ song }}<span v-if="idx < playlist.songs.length - 1">, </span>
        </template>
      </span>
    </div>
  </div>
</template>

<style scoped>
.toprated-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.playlist-line {
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 100%;
  max-width: 100%;
}

.playlist-name, .creator-name, .display-genre, .songs {
  margin-right: 5px;
}
</style>
