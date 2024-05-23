<!-- src\components\discover\toprated\topratedContainer.vue -->
<script>
import { useDiscoverStore } from '@/stores/useDiscoverStore';
import { computed, onMounted, ref, onUnmounted } from 'vue';

export default {
  name: 'topratedContainer',
  setup(props, { emit }) {
    const discoverStore = useDiscoverStore();
    const topRatedPlaylists = computed(() => discoverStore.topRatedPlaylists.slice(0, 10));
    const currentPage = ref(1);

    // Update totalPages calculation for 2 playlists per page
    const totalPages = computed(() => Math.ceil(topRatedPlaylists.value.length / 2));
    const updateCount = ref(0);

    const rotatePages = () => {
      const nextPage = currentPage.value >= totalPages.value ? 1 : currentPage.value + 1;
      currentPage.value = nextPage;
      updateCount.value++;
      clearInterval(intervalId);
    };
    let intervalId;

    const showModal = (playlist) => {
      emit('show-modal', playlist);
    }

    onMounted(async () => {
      intervalId = setInterval(rotatePages, 10000); 
      await discoverStore.fetchTopRatedPlaylists(10);
    });

    onUnmounted(() => {
      clearInterval(intervalId);
    });

    const currentAudio = ref(null);
    const baseUrl = process.env.VUE_APP_API_BASE_URL;

    const playpreview = async (playlist) => {
      if (currentAudio.value) {
        currentAudio.value.pause();
        currentAudio.value = null; // Clear the previous audio
      }
      let foundPlayable = false;
      for (let songDetail of playlist.songs) {
        const [title, artist] = songDetail.split(' - ', 2);
        try {
          const response = await fetch(`${baseUrl}/spotify/preview?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`);
          if (response.ok) {
            const data = await response.json();
            if (data.previewUrl) {
              currentAudio.value = new Audio(data.previewUrl);
              currentAudio.value.play();
              foundPlayable = true;
              break;
            }
          } else if (response.status === 404) {
            continue;
          } else {
            console.warn('Preview URL not available for this song:', response.statusText);
          }
        } catch (error) {
          console.warn('Error playing song preview:', error);
        }
      }
      if (!foundPlayable) {
        console.info('No playable song found in the playlist.');
      }
    };

    return {
      topRatedPlaylists,
      currentPage,
      changePage: rotatePages,
      playpreview,
      updateCount,
      showModal,
      totalPages
    };
  },
};
</script>

<template>
  <div class="toprated-container">
    <transition-group name="playlist-transition" tag="div" class="playlist-wrapper">
      <v-card
          class="playlist-line"
          v-for="(playlist, index) in topRatedPlaylists.slice((currentPage - 1) * 2, currentPage * 2)"
          :key="`toprated-${playlist.id}-${updateCount}`"
          @click="showModal(playlist)"
        >

        <div class="card-header">
          <v-card-title>{{ playlist.name }}</v-card-title>
          <div class="spotify-icon">
            <span>Catch a Taste</span>
            <img src="@/assets/images/music_icons/spotify.png" alt="Spotify" @click="playpreview(playlist)">
          </div>
        </div>
        <div class="card-subtitle">
          <span>by {{ playlist.creatorName }} in {{ playlist.displayGenre }}</span>
          <v-btn small color="blue lighten-2" @click="showModal(playlist)">See More</v-btn>
        </div>
        <v-card-text class="card-text">
          <div v-if="playlist.uniqueArtists && playlist.uniqueArtists.length" class="artist-container">
            <strong>Artists:</strong>
            <span v-for="(artist, idx) in playlist.uniqueArtists" :key="`artist-${idx}`">
              {{ artist }}<span v-if="idx < playlist.uniqueArtists.length - 1">, </span>
            </span>
          </div>
        </v-card-text>
      </v-card>
    </transition-group>
    <div class="pagination-dots">
      <span v-for="page in totalPages" :key="page"
            :class="['dot', { 'active-dot': page === currentPage }]"
            @click="changePage(page)"></span>
    </div>
  </div>
</template>


<style scoped>
.toprated-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
}

.playlist-wrapper {
  position: relative;
}

.playlist-line {
  width: 100%; 
  max-width: 600px;
  margin: auto; 
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  padding: 10px;
  margin-bottom: 10px;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}


.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #8d309f;
  color: white;
  padding: 10px;
  border-radius: 8px;
}

.spotify-icon {
  display: flex;
  align-items: center;
}

.spotify-icon img {
  width: 24px;
  height: 24px;
}
.spotify-icon span {
  margin-right: 5px; 
}

.card-subtitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e8e8e8;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 8px;
}

.card-text {
  background-color: #e8e8e8;
  padding: 10px;
  border-radius: 8px;
}

.artist-container {
  background-color: #d0e0f0;
  padding: 5px;
  border-radius: 8px;
  display: flex; 
  align-items: center; 
  white-space: nowrap;
  overflow: hidden; 
  text-overflow: ellipsis;
}

.pagination-dots {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.dot {
  height: 10px;
  width: 10px;
  background-color: #9932ad;
  border-radius: 50%;
  display: inline-block;
  margin: 0 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.active-dot {
  transform: scale(1.5);
  background-color: #4f035e;
}

.playlist-transition-enter-active, .playlist-transition-leave-active {
  transition: opacity 1s ease-in-out;
}

.playlist-transition-enter-from, .playlist-transition-leave-to {
  opacity: 0;
}

.playlist-transition-enter-to, .playlist-transition-leave-from {
  opacity: 1;
}
</style>
