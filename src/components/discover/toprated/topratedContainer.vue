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

    const topRatedPlaylists = computed(() => {
      const playlists = discoverStore.topRatedPlaylists;
      // Clone playlists to ensure there is no empty space during the scroll
      const clonedPlaylists = [...playlists, ...playlists, ...playlists];
      return clonedPlaylists;
    });

    return {
      topRatedPlaylists,
    };
  },
};
</script>

<template>
  <div class="toprated-container">
    <div class="scrolling-playlists">
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
  </div>
</template>

<style scoped>
.toprated-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  position: relative;
  height: 500px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.scrolling-playlists {
  display: flex;
  flex-direction: column;
  animation: scrollPlaylists 60s linear infinite;
}

@keyframes scrollPlaylists {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-33.33%); /* Adjust to match the number of cloned playlists */
  }
}

.playlist-line {
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  margin-bottom: 10px;
  color: #333;
  font-size: 1rem;
}

.playlist-name {
  color: #4b8df8;
}

.creator-name {
  color: #4caf50;
}

.display-genre {
  color: #6a3191;
}

.songs {
  color: #f44336;
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
