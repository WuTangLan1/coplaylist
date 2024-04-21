<!-- src\components\inputsDir\vibeContainer.vue -->

<template>
  <div class="vibe-container">
    <h2>Select Your Vibe</h2>
    <div class="input-group">
      <label for="mood">Mood:</label>
      <select id="mood" v-model="selectedMood">
        <!-- Options for mood -->
      </select>
    </div>
    <div class="input-group">
      <label for="activity">Activity:</label>
      <select id="activity" v-model="selectedActivity">
        <!-- Options for activity -->
      </select>
    </div>
    <button @click="next">Next</button>
  </div>
</template>

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

<style scoped>
.vibe-container {
  /* Styles for the container */
}
.input-group label {
  /* Styles for labels */
}
.input-group select {
  /* Styles for select elements */
}
</style>