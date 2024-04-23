<!-- src\components\inputsDir\vibeContainer.vue -->
<script>
import { usePromptStore } from '@/stores/usePromptStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const promptStore = usePromptStore();
    const router = useRouter(); 

    const updateSelection = (type, value) => {
      promptStore.updateVibeSelection(type, value);
    };

    const validateAndNext = () => {
      if (promptStore.validateVibes()) {
        console.log('Valid vibes. Proceeding to next step...');
        router.push({ name: 'Songs' });
      } else {
        // showModal is called within validateVibes if validation fails
      }
    };

    function goBack() {
      router.push({ name: 'Tone' });
    }

    return {
      vibes: promptStore.vibes,
      moods: ['Happy', 'Chill', 'Energetic', 'Sad'],
      activities: ['Working Out', 'Studying', 'Relaxing'],
      familiarities: ['Famous', 'Known', 'Not Well Known'],
      settings: ['By Yourself', 'With Close Friends', 'At the Party'],
      updateSelection,
      validateAndNext,
      goBack
    };
  },
};
</script>


<template>
  <div class="vibe-container">
    <h2>Select Your Vibe</h2>
    <div class="input-group">
      <label for="mood">Mood:</label>
      <select id="mood" v-model="vibes.selectedMood" @change="updateSelection('selectedMood', $event.target.value)">
        <option disabled value="">Select Mood</option>
        <option v-for="mood in moods" :key="mood" :value="mood">{{ mood }}</option>
      </select>
    </div>
    <div class="input-group">
      <label for="activity">Activity:</label>
      <select id="activity" v-model="vibes.selectedActivity" @change="updateSelection('selectedActivity', $event.target.value)">
        <option disabled value="">Select Activity</option>
        <option v-for="activity in activities" :key="activity" :value="activity">{{ activity }}</option>
      </select>
    </div>
    <div class="input-group">
      <label for="familiarity">Familiarity:</label>
      <select id="familiarity" v-model="vibes.selectedFamiliarity" @change="updateSelection('selectedFamiliarity', $event.target.value)">
        <option disabled value="">Select Familiarity</option>
        <option v-for="familiarity in familiarities" :key="familiarity" :value="familiarity">{{ familiarity }}</option>
      </select>
    </div>
    <div class="input-group">
      <label for="setting">Setting:</label>
      <select id="setting" v-model="vibes.selectedSetting" @change="updateSelection('selectedSetting', $event.target.value)">
        <option disabled value="">Select Setting</option>
        <option v-for="setting in settings" :key="setting" :value="setting">{{ setting }}</option>
      </select>
    </div>
    <div class="button-group">
      <button class="prev-btn" @click="goBack">Previous</button>
      <button class="next-btn" @click="validateAndNext">Next</button>
    </div>
  </div>
</template>


<style scoped>
.vibe-container {
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

@media (max-width: 1000px) {
  .vibe-container {
    min-width: 60%;
  }
}

@media (min-width: 1000px) {
  .vibe-container {
    min-width: 30%;
  }
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
  font-size: clamp(13px, 2.5vw, 16px);
}

.input-group select {
  padding: 0.8rem; 
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 1rem; 
  font-size: clamp(12px, 2.5vw, 16px);
  -webkit-appearance: none;
  appearance: none;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.next-btn, .prev-btn {
  padding: 0.75rem 1.5rem;
  background-color: #507cac;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.9rem;
  flex: 1;
  margin: 0 0.5rem; 
  transition: background-color 0.3s ease;
}

.prev-btn {
  background-color: #8b9dc3; 
}

.next-btn:hover, .prev-btn:hover {
  background-color: #345f8d; 
}

.prev-btn:hover {
  background-color: #3b5998; 
}

h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: clamp(18px, 5vw, 24px);
}

</style>
