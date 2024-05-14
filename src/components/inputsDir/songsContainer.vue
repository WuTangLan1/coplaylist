<!-- src\components\inputsDir\songsContainer.vue -->
<script>
import { ref, watch} from 'vue';
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
    const showLoadingModal = ref(false);

    watch(newMusic, (newValue) => {
      promptStore.updateNewMusic(newValue);
    });

    const selectedSongs = ref([
      { name: '', artist: '', influence: 50 },
      { name: '', artist: '', influence: 50 }
    ]);

    function updateSong(index, field, value) {
        selectedSongs.value[index][field] = value;
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
      showLoadingModal
    };
  }
};
</script>



<template>
  <div class="songs-container">
    <div class="step-heading">
      <div class="step-number">3</div> 
      <h2>Add Songs</h2>
    </div>
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
    <div class="checkbox-group">
      <label class="checkbox-label">
        <input type="checkbox" id="newMusic" v-model="newMusic" />
        <span class="checkbox-description">Ensures no previously generated songs are included</span>
      </label>
    </div>
    <div class="button-group">
      <button class="prev-btn" @click="goBack">Previous</button>
      <button class="gen-btn" :disabled="!authStore.isAuthenticated || (authStore.user && authStore.user.tokens < 1)" @click="generatePlaylist">
        <img src="@/assets/images/header/tokens.png" alt="Token" class="token-icon"> 1 Generate
      </button>
    </div>
    <loadingModal :show="showLoadingModal" />
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
  max-width: 750px; 
  margin: auto; 
  overflow-y: auto; 
}

.step-heading {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.step-number {
  color: #507cac;
  font-size: 1.2rem;
  font-weight: bold;
  background: #e5e1f2;
  border-radius: 10%;  
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  border: 2px solid #ccc;
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
  flex-grow: 1; 
  margin-right: 10px; 
}

.influence-label {
  width: 50px; 
  text-align: right;
  font-size: 0.9rem; 
  color: #333; 
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
  justify-content: center; /* Center the checkbox group horizontally */
  align-items: center; /* Align vertically */
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.9rem;
}


.checkbox-description {
  margin-left: 10px;
  font-size: 0.8rem;
  color: #666;
}

input[type="checkbox"] {
  margin-right: 5px;
  cursor: pointer;
}

.input-column input:focus, input[type="checkbox"]:focus + .checkbox-description {
  outline: 2px solid #507cac; 
}

@media (min-width: 550px) {
  .checkbox-group {
    justify-content: start; 
  }
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
  background-color: #ccc; 
  color: #666; 
  cursor: not-allowed; 
}
.token-icon {
  width: 20px; 
  height: auto;
  margin-right: 5px; 
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
