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
        <div class="selections-container">
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
            dense
          />
          <VBtn @click="addNewItem('genre', newGenre)" :disabled="newGenre.length < 3 || selectedGenres.length >= 3" color="primary">
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
        </div>

    <VBtn class="next-btn" @click="handleNext" color="primary">Next</VBtn>
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
  max-width: 1200px; 
  margin: 0 auto;
  overflow-y: auto; 
}

.selections-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.genres-container, .eras-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Set three columns regardless of width */
  gap: 10px;
}



.genre-chip, .era-chip {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  background-color: #e5e1f2;
  transition: background-color 0.3s, color 0.3s;
}

.genre-chip.selected, .era-chip.selected {
  border-color: #0b1d30;
  background-color: #d4cbef;
}
.input-group {
  display: flex;
  justify-content: space-between;
  width: 100%; 
  margin-bottom: 1rem;
  gap: 0.5rem; /* Added gap for spacing */
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