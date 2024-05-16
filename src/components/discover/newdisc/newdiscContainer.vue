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
      <div v-for="(playlist, index) in newDiscoveries" :key="index + '-clone'" class="playlist-line">
        <span class="playlist-name">{{ playlist.name }}</span> by 
        <span class="creator-name">{{ playlist.creatorName }}</span> in 
        <span class="display-genre">{{ playlist.displayGenre }}</span>:
        <span class="songs">
          <template v-for="(song, idx) in playlist.songs" :key="idx + '-clone'">
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
  animation: scrollPlaylists 60s linear infinite; /* Adjust the duration as needed */
}

@keyframes scrollPlaylists {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
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
  color: #333;
  font-size: 1rem;
}

.playlist-name {
  color: #1a73e8; /* Blue color */
}

.creator-name {
  color: #34a853; /* Green color */
}

.display-genre {
  color: #fbbc05; /* Yellow color */
}

.songs {
  color: #ea4335; /* Red color */
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
