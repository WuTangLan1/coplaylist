<!-- src\components\discover\newdisc\newdiscContainer.vue -->
<script>
import { useDiscoverStore } from '@/stores/useDiscoverStore';
import { onMounted, computed } from 'vue';

export default {
  name: 'newdisc-Container',
  setup() {
    const discoverStore = useDiscoverStore();

    onMounted(async () => {
      await discoverStore.fetchNewDiscoveries();
    });

    const newDiscoveries = computed(() => discoverStore.newDiscoveries);

    return {
      newDiscoveries,
    };
  },
};
</script>

<template>
  <div class="newdisc-container">
    <div v-for="(playlist, index) in newDiscoveries" :key="index" class="playlist-line">
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
.newdisc-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 98vw;
}

.playlist-line {
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.playlist-name, .creator-name, .display-genre, .songs {
  margin-right: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playlist-line span {
  flex-shrink: 0;
}
</style>
