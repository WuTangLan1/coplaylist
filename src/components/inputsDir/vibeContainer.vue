<!-- src\components\inputsDir\vibeContainer.vue -->
<script>
export default {
  data() {
    return {
      selectedMood: null,
      selectedActivity: null,
      moods: ['Happy', 'Chill', 'Energetic', 'Sad'],
      activities: ['Working Out', 'Studying', 'Relaxing']
    };
  },
  methods : {
    next() {
    this.$router.push({ name: 'Songs' });
  }
  }
};
</script>

<template>
  <div class="vibe-container">
    <h2>Select Your Vibe</h2>
    <div class="input-group">
      <label for="mood">Mood:</label>
      <select id="mood" v-model="selectedMood">
        <option value="" disabled>Select mood</option>
        <option v-for="mood in moods" :key="mood" :value="mood">{{ mood }}</option>
      </select>
    </div>
    <div class="input-group">
      <label for="activity">Activity:</label>
      <select id="activity" v-model="selectedActivity">
        <option value="" disabled>Select activity</option>
        <option v-for="activity in activities" :key="activity" :value="activity">{{ activity }}</option>
      </select>
    </div>
    <button class="next-btn" @click="next">Next</button>
  </div>
</template>


<style scoped>
.vibe-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: #F4F4F4; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px; 
  margin: auto;
  border: 2px solid #507cac;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
}

.input-group label {
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

.input-group select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
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
  align-self: center;
  margin-top: 1rem;
}

.next-btn:hover {
  background-color: #345f8d;
}

h2 {
  color: #333;
  margin-bottom: 1rem;
}
</style>
