<!-- // src/components/discover/newdisc/newdiscContainer.vue -->
<script>
import { useDiscoverStore } from '@/stores/useDiscoverStore';
import { computed, onMounted, ref, watch } from 'vue';

export default {
  name: 'newdiscContainer',
  setup(props, { emit }) {
    const discoverStore = useDiscoverStore();
    const visiblePlaylists = ref([]);
    const currentPage = ref(1);

    const updateVisiblePlaylists = async () => {
      await discoverStore.fetchNewDiscoveries(24);
      visiblePlaylists.value = discoverStore.newDiscoveries;
    };

    const showModal = (playlist) => {
      emit('show-modal', playlist);
    };

    const changePage = (page) => {
      currentPage.value = page;
    };

    onMounted(updateVisiblePlaylists);

    watch(currentPage, () => {
      updateVisiblePlaylists();
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
            // try another song here
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
      visiblePlaylists,
      currentPage,
      showModal,
      changePage,
      updateVisiblePlaylists,
      playpreview
    };
  },
};
</script>


<template>
  <div class="newdisc-container" v-if="visiblePlaylists.length">
    <div class="grid-container">
      <transition-group name="playlist-transition" tag="div" class="playlist-wrapper">
        <v-card
          class="playlist-line"
          v-for="(playlist, index) in visiblePlaylists.slice((currentPage - 1) * 3, currentPage * 3)"
          :key="`${currentPage}-${playlist.id || index}`"
          @click="showModal(playlist)"
        >
          <div class="card-header">
            <v-card-title>{{ playlist.name }}</v-card-title>
            <div class="spotify-icon">
              <span>Catch a Taste</span>
              <img src="@/assets/images/music_icons/spotify.png" alt="Spotify" @click.stop="playpreview(playlist)">
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
    </div>
    <div class="pagination-dots">
      <span v-for="page in Math.ceil(visiblePlaylists.length / 3)" :key="page"
            :class="['dot', { 'active-dot': page === currentPage }]"
            @click="changePage(page)"></span>
    </div>
  </div>
</template>


<style scoped>
.newdisc-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
}

.grid-container {
  display: flex; 
  flex-direction: column; 
  gap: 15px; 
}

.playlist-wrapper {
  position: relative; 
}

.playlist-line {
  width: 100%; /* Ensure full width within the container */
  max-width: 600px; /* Optional: you might set a max-width if needed */
  margin: auto; /* Centers the card if max-width is less than the container's width */
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  padding: 10px;
  margin-bottom: 10px;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.playlist-line:hover {
  transform: translateY(-5px);
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
  /* This will ensure the text has no margin on the right, sticking to the icon */
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
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

/* Entering playlists start from the left (-100% X) and slide to their position */
.playlist-transition-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.playlist-transition-enter-to {
  transform: translateX(0%);
  opacity: 1;
}

/* Exiting playlists slide off to the right (100% X) */
.playlist-transition-leave-from {
  transform: translateX(0%);
  opacity: 1;
}

.playlist-transition-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
