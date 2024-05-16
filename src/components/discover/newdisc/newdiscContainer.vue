<!-- src\components\discover\newdisc\newdiscContainer.vue -->
<script>
import { useDiscoverStore } from '@/stores/useDiscoverStore';
import { onMounted, computed, ref } from 'vue';

export default {
  name: 'newdisc-Container',
  setup(props, { emit }) {
    const discoverStore = useDiscoverStore();
    const newDiscoveries = computed(() => {
      const playlists = discoverStore.newDiscoveries;
      const clonedPlaylists = [...playlists, ...playlists, ...playlists];
      return clonedPlaylists;
    });

    const scrollingPlaylistsRef = ref(null);

    const pauseScrolling = () => {
      if (scrollingPlaylistsRef.value) {
        scrollingPlaylistsRef.value.style.animationPlayState = 'paused';
      }
    };

    const resumeScrolling = () => {
      if (scrollingPlaylistsRef.value) {
        scrollingPlaylistsRef.value.style.animationPlayState = 'running';
      }
    };

    onMounted(async () => {
      await discoverStore.fetchNewDiscoveries();
    });

    const showModal = (playlist) => {
      emit('show-modal', playlist);
    };

    return {
      newDiscoveries,
      scrollingPlaylistsRef,
      pauseScrolling,
      resumeScrolling,
      showModal,
    };
  },
};
</script>

<template>
  <div class="newdisc-container" @mouseover="pauseScrolling" @mouseleave="resumeScrolling">
    <div class="scrolling-playlists" ref="scrollingPlaylistsRef">
      <div v-for="(playlist, index) in newDiscoveries" :key="index" class="playlist-line" @click="showModal(playlist)">
        <span class="playlist-name">{{ playlist.name }}</span> by&nbsp;
        <span class="creator-name">{{ playlist.creatorName }}</span> in&nbsp;
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
  transition: background-color 0.3s, transform 0.3s; /* Smooth transition */
  cursor: pointer;
}

.playlist-line:hover {
  background-color: #e0e0e0; /* Change background color on hover */
  transform: scale(1.02); /* Slightly enlarge on hover */
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

