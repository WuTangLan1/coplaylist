<!-- src\components\inputsDir\songsContainer.vue -->
<script>
import { ref } from 'vue';
import { usePromptStore } from '@/stores/usePromptStore';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  setup() {
    const promptStore = usePromptStore();
    const router = useRouter();
    const authStore = useAuthStore();

    const selectedSongs = ref([
      { name: '', artist: '', influence: 50 },
      { name: '', artist: '', influence: 50 },
      { name: '', artist: '', influence: 50 }
    ]);

    function updateSong(index, field, value) {
        selectedSongs.value[index][field] = value;

        // Check if both fields are non-empty before updating
        if (selectedSongs.value[index].name.trim() && selectedSongs.value[index].artist.trim()) {
          promptStore.updateSong(index, 'name', selectedSongs.value[index].name);
          promptStore.updateSong(index, 'artist', selectedSongs.value[index].artist);
          promptStore.updateSong(index, 'influence', selectedSongs.value[index].influence);
        }
    }

    async function generatePlaylist() {
      if (!authStore.isAuthenticated) {
        console.error("User is not logged in. Cannot generate playlist.");
        return;
      }
      await promptStore.generatePlaylist();
      router.push({ name: 'Output' });
    }

    function goBack() {
      router.push({ name: 'Vibe' });
    }

    return {
      selectedSongs,
      updateSong,
      generatePlaylist,
      goBack,
      authStore
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
      <div class="input-column">
        <label :for="`influence-${index}`">Influence Weight</label>
        <input type="range" :id="`influence-${index}`" v-model="song.influence" min="0" max="100" />
        <span>{{ song.influence }}%</span>
      </div>
    </div>
    <div class="button-group">
      <button class="prev-btn" @click="goBack">Previous</button>
      <button class="gen-btn" :disabled="!authStore.isAuthenticated || (authStore.user && authStore.user.tokens < 2)" @click="generatePlaylist">Generate</button>
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
  max-width: 700px; 
  max-height: 75vh;
  margin: auto; 
  border: 2px solid #507cac;
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

button:disabled {
  background-color: #ccc; /* Light gray background */
  color: #666; /* Darker text color for contrast */
  cursor: not-allowed; /* Shows a 'not allowed' cursor on hover */
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
