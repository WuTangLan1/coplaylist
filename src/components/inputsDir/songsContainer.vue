<!-- src\components\inputsDir\songsContainer.vue -->

<script>
export default {
  data() {
    return {
      selectedSongs: ['', '', '']
    };
  },
  methods: {
    goToNext() {
      // Logic to handle the next button action
    }
  }
};
</script>

<template>
  <div class="songs-container">
    <h2>Add Songs You Like</h2>
    <div v-for="index in 3" :key="`song-${index}`" class="input-group">
      <input
        type="text"
        :placeholder="`Song ${index}`"
        v-model="selectedSongs[index - 1]"
        class="input-field"
      />
    </div>
    <button class="next-btn" @click="goToNext">Next</button>
  </div>
</template>

<style scoped>
.songs-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: #F4F4F4; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 300px; 
  margin: auto;
  border: 2px solid #507cac;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
}

.input-field {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 1rem; 
  font-size: clamp(12px, 2.5vw, 16px);
}

.next-btn {
  padding: 10px 20px;
  background-color: #507cac;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;
  align-self: flex-end;
  margin-top: 1rem;
}

.next-btn:hover {
  background-color: #345f8d;
}

h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: clamp(18px, 5vw, 24px);
}

/* Responsive adjustments */
@media (max-width: 1000px) {
  .songs-container {
    max-width: 60%;
  }
}

@media (min-width: 1000px) {
  .songs-container {
    max-width: 30%;
  }
}

</style>
