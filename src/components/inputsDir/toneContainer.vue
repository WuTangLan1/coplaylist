<!-- src\components\inputsDir\toneContainer.vue -->
  
<script>
export default {
  data() {
    return {
      newGenre: '',
      newEra: '',
      selectedGenres: [],
      selectedEra: [],
      commonGenres: ['Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Country', 'Funk', 'Dance', 'Blues', 'Techno'],
      commonEras: ['60s', '70s', '80s', '90s', '2000s', '2010s'],
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

    <div v-if="selectedGenres.length === 0" class="placeholder">
      Select up to 3 genres
    </div>
    
    <div class="selected-genres-container">
      <div
        v-for="genre in selectedGenres"
        :key="genre"
        class="selected-genre-chip"
      >
        {{ genre }}
        <button class="remove-genre" @click="removeGenre('genre', genre)">✕</button>
      </div>
    </div>

    <div class="input-group">
      <input
        type="text"
        placeholder="Add Genre"
        v-model="newGenre"
        @keyup.enter="addNewItem('genre', newGenre)"
      />
      <button @click="addNewItem('genre', newGenre)">Submit</button>
    </div>

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

    <div v-if="selectedGenres.length === 0" class="placeholder">
      Select up to 3 eras
    </div>
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


    <button class="next-btn" @click="goToNext">Next</button>
  </div>
</template>

  
<style scoped>
.tone-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: #F4F4F4; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 700px; 
  margin: 0;
  border: 2px solid #507cac; 
  max-height: 80vh;
  overflow-y: auto; 
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
  border-radius: 10px;
  height: 150px; /* Fixed height for the scrollable area */
  width: 90%; /* Adjust width as needed */
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: start; 
  gap: 0.5rem; 
  padding: 0.5rem;
  align-content: flex-start; /* Aligns content to the top */
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

}

.remove-genre, .remove-era {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: 8px;
}

.input-group {
  display: flex;
  justify-content: space-between;
  width: 100%; 
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

h2 {
  color: #333;
  margin-bottom: 1rem;
}

.next-btn {
    align-self: flex-end;
    padding: 10px 20px;
    background-color: #4c56af; 
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    transition: background-color 0.3s ease; 
  }
  
  .next-btn:hover {
    background-color: #46367c; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>
