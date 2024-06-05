<!-- src\components\outputsDir\playlist\playlistSection.vue -->

<script>
import { usePlaylistStore } from '@/stores/usePlaylistStore';
import { computed, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


export default {
  components : {
    FontAwesomeIcon
  },
  setup() {
    const playlistStore = usePlaylistStore();
    const playlistName = computed(() => playlistStore.playlistName);
    const playlist = computed(() => playlistStore.playlistDetails);

    const alternativeSongs = computed(() => playlistStore.getAlternativeSongs());
    const canSwap = computed(() => alternativeSongs.value.length > 0);

    const baseUrl = process.env.VUE_APP_API_BASE_URL;

    let currentAudio = null;

    async function playSongPreview(song) {
      try {

        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0; 
        }

        const response = await fetch(`${baseUrl}/spotify/preview?title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}`);

        if (response.ok) {
          const data = await response.json();
          
          currentAudio = new Audio(data.previewUrl);
          currentAudio.play();
        } else {
          console.error('Error fetching preview:', response.status, response.statusText);
          if (response.status === 404) {
            alert('Preview not available for this song. It may not be available in any market.');
          } else {
            alert('Failed to play the song preview. Please try again later.');
          }
        }
      } catch (error) {
        console.error('Error playing song preview:', error);
        alert('An error occurred while trying to play the song preview. Please try again later.');
      }
    }

    const swapSong = (index) => {
        if (canSwap.value) {
          const randomIndex = Math.floor(Math.random() * alternativeSongs.value.length);
          const newSong = alternativeSongs.value[randomIndex];
          playlistStore.playlistDetails[index] = newSong;
          playlistStore.alternativeSongs.splice(randomIndex, 1); 
        }
      };



    return {
      playlist,
      playlistName,
      playSongPreview,
      alternativeSongs,
      swapSong,
      canSwap
    };
  },
};
</script>


<template>
  <div class="playlist-section" v-if="playlist && playlist.length">
    <ol>
      <li v-for="(song, index) in playlist" :key="index" class="song-item">
        <div class="song-details">
          <div class="song-name">{{ song.title }}</div>
          <div class="song-artist">{{ song.artist }}</div>
        </div>
        <div class="song-year">{{ song.releaseYear }}</div>
        <div class="icon-container">
          <font-awesome-icon icon="redo" class="redo-icon" :class="{ 'disabled': !canSwap }" @click="canSwap && swapSong(index)" />
          <img class="spotify-icon" src="@/assets/images/music_icons/spotify.png" @click="playSongPreview(song)" alt="Play preview" />
        </div>
      </li>
    </ol>
  </div>
  <div v-else class="empty-playlist">
    <p>No songs available. Please generate a playlist.</p>
  </div>
</template>

 
<style scoped>
.playlist-section {
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1600px;
  margin: 1rem auto;
  overflow-y: auto;
  box-shadow: 0 2px 12px rgb(48, 5, 57);
}

@media (min-width: 724px) {
  .playlist-section ol {
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    column-gap: 20px; 
  }

  .song-item {
    padding: 0.75rem 1rem; 
    font-size: 0.8rem; 
  }

  .song-details {
    font-size: 0.8rem; 
  }

  .song-name, .song-artist {
    font-size: 0.9rem; 
  }

  .icon-container {
    min-width: 50px;
  }

  .spotify-icon, .redo-icon {
    width: 20px; 
    height: 20px;
  }
}

@media (min-width: 1024px) {
  .playlist-section ol {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    column-gap: 20px; 
    row-gap: 20px;
    padding: 10px;
  }

  .song-item {
    padding: 0.75rem 1rem;
    font-size: 0.75rem; 
  }

  .song-details {
    font-size: 0.75rem; 
  }

  .song-name, .song-artist {
    font-size: 0.85rem; 
  }

  .icon-container {
    min-width: 50px; 
  }

  .spotify-icon, .redo-icon {
    width: 18px; 
    height: 18px;
  }

  .song-item:hover {
      background-color: #e0e0e0;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
}

@media (min-width: 1440px) { /* New breakpoint for larger screens */
  .playlist-section ol {
    grid-template-columns: repeat(4, 1fr); /* Four columns for screens >= 1440px */
  }
}

.playlist-title {
  font-size: 2rem;
  background-color: #4a76a8;
  color: #fff;
  padding: 1.5rem;
  margin: 0;
  text-align: center;
}

ol {
  list-style-type: none;
  margin: 0;
  padding: 0;
  box-shadow: 0 2px 12px rgb(48, 5, 57);
}

.song-item {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e6e6e6;
  transition: background-color 0.2s ease-in-out;
}

.song-item:hover {
  background-color: #f8f9fa;
}

.song-details {
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .song-item {
    padding: 1.5rem 2rem;
  }

  .song-name, .song-artist {
    font-size: 1.5rem; 
  }

  .song-artist {
    font-size: 1.2rem;
  }
}

.redo-icon {
  margin-right: 10px;
  cursor: pointer;
  color: #4a76a8; 
  width: 24px;
  height: 24px;
}

.redo-icon.disabled {
  color: #ccc; 
  cursor: not-allowed;
}

.song-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px; 
}

@media (max-width: 390px)
{
  .song-name {
    max-width: 150px; 
  }

  .song-artist {
    max-width: 150px; 
  }
}

.song-artist {
  font-size: 1.1rem;
  color: #607D8B;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px; 
}

.song-year {
  font-size: 0.9rem;
  color: #777;
}

.icon-container {
  display: flex;
  align-items: center;
}

.spotify-icon, .redo-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.spotify-icon {
  margin-right: 5px; 
}

.redo-icon {
  color: #4a76a8; 
}

.empty-playlist {
  text-align: center;
  color: #bbb;
  padding: 3rem;
}

.song-item:nth-child(odd):hover {
  background-color: #e3f2fd;
}

.song-item:nth-child(even):hover {
  background-color: #fce4ec;
}

@media (max-width: 768px) {
  .playlist-section {
    margin: 1rem auto;
  }

  .song-year {
    align-self: auto;
    margin-top: 0.5rem;
  }

  .song-name,
  .song-artist {
    font-size: 1rem;
  }

  .song-artist {
    color: #607D8B; 
  }
}
</style>