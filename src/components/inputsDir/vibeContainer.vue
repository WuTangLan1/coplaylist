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
        router.push({ name: 'Songs' });
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
      platforms: ['Apple Music', 'Spotify', 'Youtube Music'],
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
    <h3 class="description">
      Select at least two of the below setting to guide the direction of your generated playlist.
    </h3>
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
    <div class="input-group">
      <label for="platform">Platform:</label>
      <select id="platform" v-model="vibes.selectedPlatform" @change="updateSelection('selectedPlatform', $event.target.value)">
        <option disabled value="">Select Platform</option>
        <option v-for="platform in platforms" :key="platform" :value="platform">{{ platform }}</option>
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
  padding: 1rem;
  background: #F4F4F4; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 300px; 
  margin: auto;
  border: 2px solid #507cac;
  max-height: 80vh;
  overflow-y: auto; 
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
  color: #333;
  font-size: clamp(14px, 3.2vw, 18px);
}

.input-group select {
  padding: 0.8rem; 
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 1rem; 
  font-size: clamp(12px, 3vw, 16px);
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
  font-size: 1rem;
  flex: 1;
  margin: 0 0.5rem; 
  transition: background-color 0.3s ease;
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
  font-size: clamp(22px, 5vw, 28px);
}

</style>
