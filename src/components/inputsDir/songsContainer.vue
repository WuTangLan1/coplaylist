<!-- src\components\inputsDir\songsContainer.vue -->
<script>
import { ref } from 'vue';
import { usePromptStore } from '@/stores/usePromptStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const promptStore = usePromptStore();
    const router = useRouter();
    const selectedSongs = ref([
      { name: '', artist: '' },
      { name: '', artist: '' },
      { name: '', artist: '' }
    ]);

    function updateSong(index, field, value) {
      selectedSongs.value[index][field] = value;
      if (selectedSongs.value[index].name.trim() && selectedSongs.value[index].artist.trim()) {
        promptStore.updateSong(index, 'name', selectedSongs.value[index].name);
        promptStore.updateSong(index, 'artist', selectedSongs.value[index].artist);
      }
    }

    async function generatePlaylist() {
        const promptDetails = "Tom waits, beyonce, eminem, dr dre" + selectedSongs.value.map(song => `${song.name} by ${song.artist}`).join(', ');
        try {
          const response = await fetch('http://localhost:3000/generate-playlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompts: promptDetails })
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const playlist = await response.json();
          console.log('Generated Playlist:', playlist);
        } catch (error) {
          console.error('Error fetching playlist:', error);
        }
      }


    function goBack() {
      router.push({ name: 'Vibe' });
    }

    return {
      selectedSongs,
      updateSong,
      generatePlaylist,
      goBack
    };
  }
};
</script>

<template>
  <div class="songs-container">
    <h2>Add Songs</h2>
    <h3 class="description">
      Add up to three songs you like to guide the playlist generation (these will not be included in the generated playlist)
    </h3>
    <div v-for="(song, index) in selectedSongs" :key="`song-${index}`" class="input-group">
      <div class="input-column">
        <label :for="`song-name-${index}`">Song Name</label>
        <input
          :id="`song-name-${index}`"
          v-model="song.name"
          @input="updateSong(index, 'name', $event.target.value)"
          placeholder="Enter Song Name"
        />
      </div>
      <div class="input-column">
        <label :for="`artist-name-${index}`">Artist Name</label>
        <input
          :id="`artist-name-${index}`"
          v-model="song.artist"
          @input="updateSong(index, 'artist', $event.target.value)"
          placeholder="Enter Artist Name"
        />
      </div>
    </div>
    <div class="button-group">
      <button class="prev-btn" @click="goBack">Previous</button>
      <button class="gen-btn" @click="generatePlaylist">Generate</button>
    </div>
  </div>
</template>


<style scoped>
.songs-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem; 
  background: #F4F4F4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 800px;
  margin: auto; 
  border: 2px solid #507cac;
  max-height: 80vh;
  overflow-y: auto; 
}

h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: clamp(22px, 5vw, 28px);
}

h3.description {
  color: #666666; 
  font-size: 0.9rem; 
  text-align: center;
  margin: 0.5rem 0 1.5rem; 
  font-weight: normal; 
  max-width: 600px;
  line-height: 1.4; 
  margin-left: auto; 
  margin-right: auto;
}

.input-group {
  width: 90%; 
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem; 
}

.input-column {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0.25rem; 
}

.input-column label {
  font-size: 0.9rem; 
  color: #507cac; 
  margin-bottom: 0.5rem; 
}

.input-column input {
  padding: 0.75rem; 
  border: 1px solid #dcdcdc; 
  border-radius: 4px;
  font-size: 0.9rem; 
  transition: border 0.3s, box-shadow 0.3s; 
}

.input-column input:focus {
  border-color: #507cac; 
  box-shadow: 0 0 0 2px #b0c4de; 
  outline: none;
}

.button-group {
  display: flex;
  justify-content: space-between; 
  width: 100%; 
  margin-top: 1rem; 
}

.gen-btn, .prev-btn {
  padding: 0.9rem 1.5rem;
  background-color: #507cac; 
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.9rem; 
  transition: background-color 0.3s ease;
  flex-grow: 0;
  margin: 0; 
}

.gen-btn {
  background-color: #9c62bd; 
}

.gen-btn:hover{
  background-color: #66138c; 
}

.prev-btn:hover {
  background-color: #3b5998; 
}

@media (min-width: 550px) {
  .input-group {
    flex-direction: row;
    justify-content: space-between;
  }

  .input-column {
    width: 48%; 
    margin-bottom: 0;
  }
}
</style>
