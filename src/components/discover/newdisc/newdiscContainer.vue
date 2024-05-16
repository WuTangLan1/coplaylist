<!-- src\components\discover\newdisc\newdiscContainer.vue -->
<script>
import { useDiscoverStore } from '@/stores/useDiscoverStore';
import { onMounted, computed, ref } from 'vue';

export default {
  name: 'newdisc-Container',
  setup() {
    const discoverStore = useDiscoverStore();
    const newDiscoveries = ref([]);

    onMounted(async () => {
      await discoverStore.fetchNewDiscoveries();
      newDiscoveries.value = discoverStore.newDiscoveries;
      startScrolling();
    });

    const startScrolling = () => {
      setInterval(() => {
        newDiscoveries.value.push(newDiscoveries.value.shift());
      }, 3000); // Adjust the speed of the scrolling here
    };

    return {
      newDiscoveries,
    };
  },
};
</script>

<template>
  <div class="newdisc-container">
    <div class="scrolling-playlists">
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
  </div>
</template>

<style scoped>
.newdisc-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 98vw;
  overflow: hidden;
  position: relative;
  height: 500px; /* Adjust the height as needed */
}

.scrolling-playlists {
  display: flex;
  flex-direction: column;
  animation: scrollPlaylists 30s linear infinite; /* Adjust the duration as needed */
}

@keyframes scrollPlaylists {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

.playlist-line {
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  margin-bottom: 20px;
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
