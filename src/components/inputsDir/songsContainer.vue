<!-- src\components\inputsDir\songsContainer.vue -->
<script>
import { ref, watch, onMounted } from 'vue';
import { usePromptStore } from '@/stores/usePromptStore';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';
import loadingModal from '@/components/outputsDir/loadingModal.vue';
import tokenImg from '@/assets/images/header/tokens.png'; 
import tokensImg from '@/assets/images/header/moretokens.png'; 
import axios from 'axios';

export default {
  components: {
    loadingModal,
  },
  setup() {
    const promptStore = usePromptStore();
    const router = useRouter();
    const authStore = useAuthStore();
    const newMusic = ref(false);
    const showLoadingModal = ref(false);
    const searchQuery = ref('');
    const searchResults = ref([[], []]);

    watch(newMusic, (newValue) => {
      promptStore.updateNewMusic(newValue);
    });

    const fetchSongSuggestions = async (query, index) => {
      try {
        const apiUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';
        const response = await axios.get(`${apiUrl}/spotify/search`, { params: { query } });
        if (response.data && response.data.tracks && Array.isArray(response.data.tracks.items)) {
            searchResults.value[index] = response.data.tracks.items.slice(0, 5);
        } else {
            throw new Error('Unexpected response structure: ' + JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error('Failed to fetch song suggestions:', error);
        searchResults.value[index] = [];
      }
    };

    function handleSongSelect(song, index) {
      if (song && song.artists && song.artists.length > 0) {
        const songArtist = `${song.name} - ${song.artists[0].name}`;
        selectedSongs.value[index].songArtist = songArtist;  

        promptStore.updateSong(index, 'name', song.name);
        promptStore.updateSong(index, 'artist', song.artists[0].name);

        searchResults.value[index] = [];  
      }
    }

    const selectedSongs = ref([
      { songArtist: '', influence: 50 },
      { songArtist: '', influence: 50 },
    ]);

    function updateSong(index, value) {
      selectedSongs.value[index].songArtist = value;
      const parts = value.split(' - ');
      console.log('updated song ', index, value)
      if (parts.length === 2) {
        promptStore.updateSong(index, 'name', parts[0].trim());
        promptStore.updateSong(index, 'artist', parts[1].trim());
      }
    }

    async function generatePlaylist() {
      if (!authStore.isAuthenticated) {
        console.error('User is not logged in. Cannot generate playlist.');
        return;
      }
      if (!promptStore.validateSongs()) {
        promptStore.validateSongs();
        return;
      } else {
        showLoadingModal.value = true;
        try {
          await promptStore.generatePlaylist(newMusic.value);
          router.push({ name: 'Output' });
        } finally {
          showLoadingModal.value = false;
        }
      }
    }

    function goBack() {
      router.push({ name: 'Vibe' });
    }

    onMounted(() => {
      authStore.verifyEmailStatus();
    })

    return {
      selectedSongs,
      updateSong,
      generatePlaylist,
      goBack,
      authStore,
      newMusic,
      showLoadingModal,
      tokenImg,
      tokensImg,
      searchQuery,
      searchResults,
      handleSongSelect,
      fetchSongSuggestions
    };
  },
};
</script>


<template>
  <div class="songs-container">
    <div class="step-heading">
      <div class="step-number">3</div>
      <h2>Add Songs</h2>
    </div>
    <h3 class="description">
      Add up to two songs you like to guide the playlist generation (these will
      not be included in the generated playlist).
    </h3>
    <!-- Input field for each song -->
    <div v-for="(song, index) in selectedSongs" :key="`song-${index}`" class="input-group">
      <div class="input-column">
        <label :for="`song-artist-${index}`">Song - Artist</label>
        <input
            :id="`song-artist-${index}`"
            v-model="song.songArtist"
            @input="event => fetchSongSuggestions(event.target.value, index)"
            placeholder="Search for songs on Spotify..."
            class="song-search-input"
          />
          <ul v-if="searchResults[index] && searchResults[index].length">
              <li v-for="result in searchResults[index]" :key="result.id" @click="() => handleSongSelect(result, index)">
                  {{ result.name }} - {{ result.artists[0].name }}
              </li>
          </ul>
      </div>
    </div>
    <div class="checkbox-group">
      <label class="checkbox-label">
        <input type="checkbox" id="newMusic" v-model="newMusic" />
        <span class="checkbox-description">Ensures no previously generated songs are included</span>
      </label>
    </div>
    <div class="button-group">
      <div v-if="authStore.user && !authStore.user.email_verified" class="email-verification-warning">
        <p>Please verify your email address before generating a playlist.</p>
      </div>
      <div class="button-row">
        <button class="prev-btn" @click="goBack">Previous</button>
        <div v-if="authStore.user" class="token-display">
          <img
            :src="authStore.user.tokens === 1 ? tokenImg : tokensImg"
            alt="Tokens"
          />
          <span>{{ authStore.user.tokens }}</span>
        </div>
        <button class="gen-btn" :disabled="!authStore.isAuthenticated || (authStore.user && authStore.user.tokens < 1) || !authStore.user.email_verified" @click="generatePlaylist">
          <img src="@/assets/images/header/tokens.png" alt="Token" class="token-icon"> Generate
        </button>
      </div>
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

.token-display {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px; 
  border: 1px solid #ccc; 
  padding: 5px 10px; 
  border-radius: 5px;
  background-color: #fff;
}

.token-display img {
  width: 20px;
  margin-right: 5px; 
}

.token-display span {
  font-size: 1rem; 
  color: #333;
  font-weight: bold;
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
  justify-content: center; 
  align-items: center; 
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem; 
}

.button-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button:disabled {
  background-color: #ccc; 
  color: #666; 
  cursor: not-allowed; 
}

.token-icon {
  width: 20px; 
  height: auto;
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
  margin: 0.5rem; /* Added margin for better spacing */
  width: auto; /* Ensure consistent button width */
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

.email-verification-warning p {
  color: #d9534f;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
  width: 100%;
}

.song-search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

li {
  padding: 8px;
  cursor: pointer;
  background-color: #f4f4f4;
}

li:hover {
  background-color: #e2e2e2;
}
</style>