<!-- src\components\outputsDir\playlist\playlistSection.vue -->

<script>
import { usePlaylistStore } from '@/stores/usePlaylistStore';
import { computed} from 'vue';

export default {
  setup() {
    const playlistStore = usePlaylistStore();
    const playlistName = computed(() => playlistStore.playlistName);
    const playlist = computed(() => playlistStore.playlistDetails);

    return { playlist, playlistName };
  },
  methods : {
    async playSongPreview(song) {
        try {
          console.log('Attempting to play preview for:', song.title, 'by', song.artist);
          const response = await fetch(`http://localhost:3000/spotify/preview?title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}`);
          console.log('Response from /preview:', response);
          if (response.ok) {
            const data = await response.json();
            console.log('Response data:', data);
            const audio = new Audio(data.previewUrl);
            audio.play();
          } else {
            console.error('Error fetching preview:', response.status, response.statusText);
            // Display an error message to the user
            alert('Failed to play the song preview. Please try again later.');
          }
        } catch (error) {
          console.error('Error playing song preview:', error);
          // Display an error message to the user
          alert('An error occurred while trying to play the song preview. Please try again later.');
        }
}
  }
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
        <img
            class="spotify-icon"
            src="@/assets/images/music_icons/spotify.png"
            @click="playSongPreview(song)"
            alt="Play preview"
          />
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
  max-width: 800px;
  margin: 1rem;
  overflow-y: auto;
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
}

.song-item {
  display: flex;
  justify-content: space-between; /* This line ensures that items are spaced across the main axis */
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

.song-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
}

.song-artist {
  font-size: 1.1rem;
  color: #607D8B;
}

.song-year {
  font-size: 0.9rem;
  color: #777;
}

.spotify-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 1rem;
}

.empty-playlist {
  text-align: center;
  color: #bbb;
  padding: 3rem;
}

/* Adding some playful colors for the hover effect */
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
    color: #607D8B; /* slightly different color for mobile for fun */
  }
}
</style>
