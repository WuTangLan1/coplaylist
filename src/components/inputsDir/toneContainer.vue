<!-- src\components\inputsDir\toneContainer.vue -->
<script>
import { ref, computed } from 'vue';
import { usePromptStore } from '@/stores/usePromptStore';
import { useRouter } from 'vue-router';
import { VChip, VBtn, VTextField } from 'vuetify/components';

export default {
  components: {
    VChip,
    VBtn,
    VTextField,
  },
  setup() {
    const promptStore = usePromptStore();
    const newGenre = ref('');
    const router = useRouter();

    const selectedGenres = computed({
      get() {
        return promptStore.tones.selectedGenres;
      },
      set(genres) {
        promptStore.tones.selectedGenres = genres;
      }
    });

    const selectedEra = computed({
      get() {
        return promptStore.tones.selectedEra;
      },
      set(eras) {
        promptStore.tones.selectedEra = eras;
      }
    });

    function toggleGenreSelection(genre) {
      const index = selectedGenres.value.indexOf(genre);
      if (index !== -1) {
        selectedGenres.value.splice(index, 1);
      } else if (selectedGenres.value.length < 3) {
        selectedGenres.value.push(genre);
      }
    }

    function toggleEraSelection(era) {
      const index = selectedEra.value.indexOf(era);
      if (index !== -1) {
        selectedEra.value.splice(index, 1);
      } else if (selectedEra.value.length < 3) {
        selectedEra.value.push(era);
      }
    }

    function addNewItem(type, item) {
      if (type === 'genre' && item && selectedGenres.value.length < 3 && !selectedGenres.value.includes(item)) {
        selectedGenres.value.push(item);
        newGenre.value = '';
      }
    }

    function removeGenre(genre) {
      selectedGenres.value = selectedGenres.value.filter(g => g !== genre);
    }

    function removeEra(era) {
      selectedEra.value = selectedEra.value.filter(e => e !== era);
    }

    function handleNext() {
        if (!promptStore.validateTones()) {
            return;
        }
        router.push({ name: 'Vibe' }).catch(err => {
            console.error(err);
        });
    }

    return {
      handleNext,
      selectedGenres,
      selectedEra,
      newGenre,
      toggleGenreSelection,
      toggleEraSelection,
      addNewItem,
      removeGenre,
      removeEra,
      commonGenres: ['Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Country', 'Funk', 'Dance', 'Blues', 'Techno'],
      commonEras: ['60s', '70s', '80s', '90s', '2000s', '2010s'],
    };
  },
};
</script>

<template>
  <div class="tone-container">
    <div class="step-heading">
      <div class="step-number">1</div>
      <h2>Define Your Tone</h2>
    </div>
    <h3 class="description">
      Select at least one genre and one era to create a base for your generated playlist
    </h3>
    <div class="genres-container">
      <VChip
        v-for="genre in commonGenres"
        :key="genre"
        :active="selectedGenres.includes(genre)"
        @click="toggleGenreSelection(genre)"
        class="genre-chip"
      >
        {{ genre }}
      </VChip>
    </div>

    <div v-if="selectedGenres.length === 0" class="placeholder">
      Select up to 3 genres
    </div>

    <div class="selected-genres-container">
      <VChip
        v-for="genre in selectedGenres"
        :key="genre"
        class="selected-genre-chip"
        closable
        @click:close="removeGenre(genre)"
      >
        {{ genre }}
      </VChip>
    </div>

    <div class="input-group">
      <VTextField
        v-model="newGenre"
        placeholder="Add Genre"
        @keyup.enter="addNewItem('genre', newGenre)"
        maxlength="25"
        outlined
      />
      <VBtn @click="addNewItem('genre', newGenre)" :disabled="newGenre.length < 3">
        Submit
      </VBtn>
    </div>

    <div class="eras-container">
      <VChip
        v-for="era in commonEras"
        :key="era"
        :active="selectedEra.includes(era)"
        @click="toggleEraSelection(era)"
        class="era-chip"
      >
        {{ era }}
      </VChip>
    </div>

    <div v-if="selectedEra.length === 0" class="placeholder">
      Select up to 3 eras
    </div>
    <div class="selected-eras-container">
      <VChip
        v-for="era in selectedEra"
        :key="era"
        class="selected-era-chip"
        closable
        @click:close="removeEra(era)"
      >
        {{ era }}
      </VChip>
    </div>

    <VBtn class="next-btn" @click="handleNext">Next</VBtn>
  </div>
</template>

<style scoped>
.tone-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: #F4F4F4; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 700px; 
  margin: 0 auto;
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

@media (min-width: 500px) {
  .tone-container {
    padding: 1.5rem;
  }
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

.placeholder {
    text-align: center;
    color: #aaa; 
    padding: 1rem;
    margin:0;
    align-items: center;
    align-self: center;
  }
  
.selected-genres-container,
.selected-eras-container {
  border: solid 1px #ccc; 
  margin-top: 0.3rem;
  border-radius: 10px;
  min-height: 50px;
  width: 100%; 
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 0.5rem; 
  padding: 1rem;
  align-content: center; 
  
}

.genres-container,
.eras-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 0.5rem;
}

@media (min-width: 500px) {
  .genres-container,
  .eras-container {
    grid-template-columns: repeat(4, 1fr); 
  }
}

.genre-chip, .era-chip,
.selected-genre-chip, .selected-era-chip {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  align-items: center;
  text-align: center;
  align-content: center;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s, color 0.3s;
  margin: 0.25rem;
  background-color: #e5e1f2;
}

.genre-chip.selected, .era-chip.selected,
.selected-genre-chip, .selected-era-chip {
  border-color: #0b1d30;
  background-color: #d4cbef;
  position: relative; 
  text-align: center;
}

.input-group {
  display: flex;
  justify-content: space-between;
  width: 95%; 
  margin-bottom: 1rem;
}

.input-group input {
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
}

.input-group button {
  padding: 0.5rem 0.8rem;
  cursor: pointer;
  background-color: #459537;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.input-group button:disabled {
  background-color: #ccc; 
  color: #666; 
  cursor: not-allowed; 
}

.input-group button:hover {
  background-color: #345f8d;
}

h2 {
  color: #333;
  margin-bottom: 1rem;
}

.next-btn {
  padding: 0.5rem 1rem;
  background-color: #507cac;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  align-self: flex-end;
  margin: 0 0.5rem; 
  transition: background-color 0.3s ease;
}
  
  .next-btn:hover {
    background-color: #46367c; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>
