<!-- src\components\inputsDir\songsContainer.vue -->
<script>
import { usePromptStore } from '@/stores/usePromptStore';
export default {
  setup() {
    const promptStore = usePromptStore();

    const handleNext = () => {
      if (!promptStore.validateAll()) {
        alert('Please fill in all fields correctly.');
        return;
      }
      // Proceed with the next step in your app
    };

    return {
      // your component data and methods
      handleNext
    };
  },
  data() {
    return {
      selectedSongs: [
        { name: '', artist: '' },
        { name: '', artist: '' },
        { name: '', artist: '' }
      ]
    };
  },
  methods: {
    goToNext() {
      // logic here
    }
  }
};
</script>

<template>
  <div class="songs-container">
    <h2>Add Songs You Like</h2>
    <form @submit.prevent="goToNext">
      <div class="inputs-wrapper">
        <div v-for="(song, index) in selectedSongs" :key="`song-${index}`" class="input-group">
          <div class="input-column">
            <label :for="`song-name-${index}`" class="input-label">Song Name</label>
            <input
              type="text"
              :id="`song-name-${index}`"
              :placeholder="`Song ${index + 1} Name`"
              v-model="song.name"
              class="input-field"
            />
          </div>
          <div class="input-column">
            <label :for="`artist-name-${index}`" class="input-label">Artist Name</label>
            <input
              type="text"
              :id="`artist-name-${index}`"
              :placeholder="`Artist ${index + 1} Name`"
              v-model="song.artist"
              class="input-field"
            />
          </div>
        </div>
      </div>
    </form>
    <div class="button-container">
        <button class="next-btn" @click="goToNext">Next</button>
      </div>
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

