<!-- src\components\inputsDir\toneContainer.vue -->
  
<script>
export default {
  data() {
    return {
      newGenre: '',
      newEra: '',
      selectedGenres: [],
      selectedEra: [],
      commonGenres: ['Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Country'],
      commonEras: ['60s', '80s', '2000s'],
    };
  },
  methods: {
    toggleGenreSelection(genre) {
      if (this.selectedGenres.includes(genre)) {
        this.selectedGenres = this.selectedGenres.filter(g => g !== genre);
      } else if (this.selectedGenres.length < 3) {
        this.selectedGenres.push(genre);
      }
    },
    addGenre() {
      if (
        this.newGenre &&
        !this.commonGenres.includes(this.newGenre) &&
        this.selectedGenres.length < 3
      ) {
        this.selectedGenres.push(this.newGenre);
        this.newGenre = ''; // Clear the input
      }
    },
    removeGenre(genre) {
      this.selectedGenres = this.selectedGenres.filter(g => g !== genre);
    },
    goToNext() {
      this.$router.push({ name: 'Vibe' });
    },
    toggleEraSelection(era) {
      const index = this.selectedEra.indexOf(era);
      if (index !== -1) {
        this.selectedEra.splice(index, 1);
      } else if (this.selectedEra.length < 3) {
        this.selectedEra.push(era);
      }
    },
    addNewItem(type, item) {
      if (type === 'genre' && this.selectedGenres.length < 3 && item) {
        this.selectedGenres.push(item);
        this.newGenre = '';
      } else if (type === 'era' && this.selectedEra.length < 3 && item) {
        this.selectedEra.push(item);
        this.newEra = '';
      }
    },
    removeGenre(type, item) {
      if (type === 'genre') {
        this.selectedGenres = this.selectedGenres.filter(g => g !== item);
      } else if (type === 'era') {
        this.selectedEra = this.selectedEra.filter(e => e !== item);
      }
    }
  }
};
</script>

<template>
  <div class="tone-container">
    <h2>Define Your Tone</h2>
    <div class="genres-container">
      <!-- Genre Selection -->
      <div
        v-for="genre in commonGenres"
        :key="genre"
        class="genre-chip"
        :class="{ 'selected': selectedGenres.includes(genre) }"
        @click="toggleGenreSelection(genre)"
      >
        {{ genre }}
      </div>
    </div>
    <div class="selected-genres-container">
      <!-- Selected Genres Display -->
      <div
        v-for="genre in selectedGenres"
        :key="genre"
        class="selected-genre-chip"
      >
        {{ genre }}
        <button class="remove-genre" @click="removeGenre('genre', genre)">✕</button>
      </div>
    </div>
    <!-- Genre Input -->
    <div class="input-group">
      <input
        type="text"
        placeholder="Add Genre"
        v-model="newGenre"
        @keyup.enter="addNewItem('genre', newGenre)"
      />
      <button @click="addNewItem('genre', newGenre)">Submit</button>
    </div>
    <!-- Era Selection -->
    <div class="eras-container">
      <div
        v-for="era in commonEras"
        :key="era"
        class="era-chip"
        :class="{ 'selected': selectedEra.includes(era) }"
        @click="toggleEraSelection(era)"
      >
        {{ era }}
      </div>
    </div>
    <!-- Selected Eras Display -->
    <div class="selected-eras-container">
      <div
        v-for="era in selectedEra"
        :key="era"
        class="selected-era-chip"
      >
        {{ era }}
        <button class="remove-era" @click="removeEra(era)">✕</button>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
.tone-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.genres-container,
.selected-genres-container
.eras-container,
.selected-eras-container  {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}


.genre-chip,
.selected-genre-chip
.era-chip,
.selected-era-chip {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 25px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s, color 0.3s;
}

.genre-chip:hover,
.selected-genre-chip {
  background-color: #507cac;
  color: white;
}

.genre-chip.selected {
  background-color: #345f8d;
  color: white;
}

.selected-genre-chip {
  background-color: #ccc;
}

.remove-genre {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-left: 8px;
}

.input-group {
  display: flex;
  margin-top: 1rem;
}

.input-group input {
  flex: 1;
  padding: 0.5rem;
  margin-right: 0.5rem;
}

.input-group button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: #507cac;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.input-group button:hover {
  background-color: #345f8d;
}

.input-group label {
  margin-right: 1rem;
}

.input-group select {
  padding: 0.5rem;
  border: 1px solid #ccc;
}
</style>