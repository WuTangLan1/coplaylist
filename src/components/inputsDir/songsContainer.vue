<!-- src\components\inputsDir\songsContainer.vue -->
// src\components\inputsDir\songsContainer.vue
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
      promptStore.updateSong(index, field, value);  // Update store state
    }

    const handleNext = () => {
      if (promptStore.validateSongs()) {
        console.log('Songs are valid. Proceeding to next step...');
        router.push({ name: 'Home' });  // Assuming 'Home' is the next route
      }
      // No need to else here as showModal will be triggered by validateSongs if invalid
    };

    return {
      selectedSongs,
      updateSong,
      handleNext
    };
  }
};
</script>

<template>
  <div class="songs-container">
    <h2>Add Songs You Like</h2>
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
    <button class="next-btn" @click="handleNext">Next</button>
  </div>
</template>

<style scoped>
.songs-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background: #F4F4F4; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px; 
  margin: 0;
  border: 2px solid #507cac; 
  max-height: 85vh;
  overflow-y: auto; 
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inputs-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-group {
  width: 70%; 
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-column {
  width: 100%; 
  padding: 0.5rem;
}


@media (min-width: 550px) {
  .input-group {
    width: 90%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start; 
  }

  .input-column {
    width: 48%; 
  }

  .input-column:first-child {
    margin-right: 4%;
  }
}


.input-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease-in-out;
}

.input-field:focus {
  border-color: #507cac;
  outline: none;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.next-btn {
  padding: 0.5rem 1.5rem;
  background-color: #507cac;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-top: auto;
}

.next-btn:hover, .next-btn:focus {
  background-color: #345f8d;
}

h2 {
  color: #333;
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 24px;
}

@media (max-width: 550px) {
  .songs-container {
    padding: 0.5rem;
    width: 100%;
  }
}
</style>

