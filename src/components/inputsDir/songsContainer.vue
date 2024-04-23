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

    const handleNext = () => {
      if (promptStore.validateSongs()) {
        console.log('Songs are valid. Proceeding to next step...');
        router.push({ name: 'Home' });  
      }
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
  padding: 1rem; /* Increased outer padding */
  background: #F4F4F4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 800px;
  margin: auto; /* Center in the viewport */
  border: 2px solid #507cac;
  max-height: 85vh;
  overflow-y: auto;
}

.input-group {
  width: 90%; /* Adjusted for better width handling */
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem; /* Added space between input groups */
}

.input-column {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0.25rem; /* Space below each input column */
}

.input-column label {
  font-size: 0.9rem; /* Adjusted label size for better appearance */
  color: #507cac; /* Color to match the theme */
  margin-bottom: 0.5rem; /* Space between label and input field */
}

.input-column input {
  padding: 0.75rem; /* Increased padding for larger touch area */
  border: 1px solid #dcdcdc; /* Lighter border color */
  border-radius: 4px; /* Rounded borders */
  font-size: 1rem; /* Legible font size */
  transition: border 0.3s, box-shadow 0.3s; /* Smooth transition for focus effects */
}

.input-column input:focus {
  border-color: #507cac; /* Theme color on focus */
  box-shadow: 0 0 0 2px #b0c4de; /* Subtle outer shadow on focus */
  outline: none;
}

.next-btn {
  padding: 0.75rem 1.5rem; /* Adjusted padding for better proportion */
  background-color: #507cac;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.9rem; /* Adjusted font size for button */
  align-self: flex-end; /* Align button to the right */
  margin-top: auto; /* Push button to the bottom */
  transition: background-color 0.3s ease;
}

.next-btn:hover, .next-btn:focus {
  background-color: #345f8d; /* Darker shade on hover/focus */
}

@media (min-width: 550px) {
  .input-group {
    flex-direction: row;
    justify-content: space-between;
  }

  .input-column {
    width: 48%; /* Adjust for side-by-side layout */
    margin-bottom: 0; /* Remove bottom margin on wide screens */
  }
}
</style>
