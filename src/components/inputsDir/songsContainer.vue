<!-- src\components\inputsDir\songsContainer.vue -->
<script>
import { ref} from 'vue';
import { usePromptStore } from '@/stores/usePromptStore';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';
import loadingModal from '@/components/outputsDir/loadingModal.vue';

export default {
  components : {
    loadingModal
  },
  setup() {
    const promptStore = usePromptStore();
    const router = useRouter();
    const authStore = useAuthStore();
    const newMusic = ref(false);
    const showTooltip = ref(false);
    const showLoadingModal = ref(false);

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
      if (!promptStore.validateTones()) {
            return;
        }
        showLoadingModal.value = true;
        try {
          await promptStore.generatePlaylist(newMusic.value);
          router.push({ name: 'Output' });
        } finally {showLoadingModal.value=false}

    }

    function goBack() {
      router.push({ name: 'Vibe' });
    }

    return {
      selectedSongs,
      updateSong,
      generatePlaylist,
      goBack,
      authStore,
      newMusic,
      showTooltip
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
          <div class="slider-container">
            <input type="range" :id="`influence-${index}`" v-model="song.influence" min="0" max="100" />
            <span class="influence-label">{{ song.influence }}%</span>
          </div>
        </div>
      </div>
      <div class="checkbox-group">
        <input type="checkbox" id="newMusic" v-model="newMusic" />
<label for="newMusic">New Music Only</label>
    </div>
    <div class="button-group">
      <button class="prev-btn" @click="goBack">Previous</button>
      <button class="gen-btn" :disabled="!authStore.isAuthenticated || (authStore.user && authStore.user.tokens < 2)" @click="generatePlaylist">
        <img src="@/assets/images/header/tokens.png" alt="Token" class="token-icon"> 2 Generate
      </button>
    </div>
  </div>
</template>


<style scoped>
.songs-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.3rem; 
  background: #F4F4F4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px; 
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
  margin-bottom: 1rem;
}

.slider-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.input-column input[type="range"] {
  flex-grow: 1; /* Allows the slider to fill available space */
  margin-right: 10px; /* Adds spacing between the slider and the label */
}

.influence-label {
  width: 50px; /* Fixed width for the label */
  text-align: right; /* Right-aligns the text */
  font-size: 0.9rem; /* Ensures the font size matches other inputs */
  color: #333; /* Color for the percentage text */
}


.input-column label {
  font-size: 0.9rem; 
  color: #507cac; 
  margin-bottom: 0.5rem; 
}

.input-column input {
  padding: 0.5rem; 
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

.checkbox-group {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  position: relative;
}

.help-icon {
  display: inline-block;
  margin-left: 5px;
  color: #507cac;
  cursor: help;
  font-weight: bold;
  font-size: larger;
}

.button-group {
  display: flex;
  justify-content: space-between; 
  width: 95%; 
  margin-top: 1rem; 

  margin: auto;
}

button:disabled {
  background-color: #ccc; /* Light gray background */
  color: #666; /* Darker text color for contrast */
  cursor: not-allowed; /* Shows a 'not allowed' cursor on hover */
}
.token-icon {
  width: 20px;  /* Adjust size as necessary */
  height: auto;
  margin-right: 5px; /* Space between the icon and the text */
  vertical-align: middle;
}

.gen-btn, .prev-btn {
  padding: 0.75rem 1rem;
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
