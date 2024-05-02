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
      moods : ['Soothing', 'Chill', 'Romantic', 'Reflective', 'Happy', 'Melancholic', 'Motivational', 'Energetic', 'Sad'],
      activities : ['Sleeping', 'Meditating', 'Relaxing', 'Reading', 'Cooking', 'Commuting', 'Studying', 'Party', 'Working Out'],
      familiarities : ['Famous', 'Classics', 'Old Favorites', 'Known', 'New Discoveries', 'Not Well Known', 'Emerging Artists'],
      settings : ['By Yourself', 'Quiet Evening', 'Family Gathering', 'With Close Friends', 'Work Environment', 'Outdoor Activities', 'At the Party'],
      platforms : ['Amazon Music', 'Apple Music', 'Bandcamp', 'SoundCloud', 'Spotify', 'Tidal', 'Youtube Music'],
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
      <label for="mood">Set a mood for the playlist:</label>
      <select id="mood" v-model="vibes.selectedMood" @change="updateSelection('selectedMood', $event.target.value)">
        <option disabled value="">Select Mood</option>
        <option v-for="mood in moods" :key="mood" :value="mood">{{ mood }}</option>
      </select>
    </div>
    <div class="input-group">
      <label for="activity">What activity is this music for :</label>
      <select id="activity" v-model="vibes.selectedActivity" @change="updateSelection('selectedActivity', $event.target.value)">
        <option disabled value="">Select Activity</option>
        <option v-for="activity in activities" :key="activity" :value="activity">{{ activity }}</option>
      </select>
    </div>
    <div class="input-group">
      <label for="familiarity">Set your music familiarity :</label>
      <select id="familiarity" v-model="vibes.selectedFamiliarity" @change="updateSelection('selectedFamiliarity', $event.target.value)">
        <option disabled value="">Select Familiarity</option>
        <option v-for="familiarity in familiarities" :key="familiarity" :value="familiarity">{{ familiarity }}</option>
      </select>
    </div>
    <div class="input-group">
      <label for="setting">Select your playlist setting:</label>
      <select id="setting" v-model="vibes.selectedSetting" @change="updateSelection('selectedSetting', $event.target.value)">
        <option disabled value="">Select Setting</option>
        <option v-for="setting in settings" :key="setting" :value="setting">{{ setting }}</option>
      </select>
    </div>
    <div class="input-group">
      <label for="platform">Select an accessible platform:</label>
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
  padding: 0.3rem;
  background: #F4F4F4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  max-height: 75vh;
  margin: auto;
  border: 2px solid #507cac;
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

.input-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  margin-bottom: 1rem;
  padding: 0.5rem;
}

.input-group label {
  margin-right: 0.5rem;
  color: #333;
  font-size: clamp(14px, 3.2vw, 18px);
  white-space: nowrap;
}

.input-group select {
  padding: 0.3rem;
  border: 2px solid #507cac;
  border-radius: 4px;
  background-color: white;
  font-size: clamp(12px, 3vw, 16px);
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  position: relative;
  cursor: pointer;
}

/* Custom dropdown arrow */
.input-group select {
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1em;
}

.input-group select:focus, .input-group select:hover {
  border-color: #345f8d;
  outline: none;
}


.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.2rem;
}

.next-btn, .prev-btn {
  padding: 0.5rem 0.5rem;
  background-color: #507cac;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  flex: 1;
  margin: 0 0.5rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.next-btn:hover, .prev-btn:hover {
  background-color: #345f8d;
  transform: translateY(-2px); /* Adds a subtle lift effect on hover */
}

.prev-btn:hover {
  background-color: #3b5998;
}

h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: clamp(22px, 5vw, 28px);
}

/* Media queries for responsiveness */
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

</style>
