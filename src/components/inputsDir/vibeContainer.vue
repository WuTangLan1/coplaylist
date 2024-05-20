<!-- src\components\inputsDir\vibeContainer.vue -->

<script>
import { usePromptStore } from '@/stores/usePromptStore';
import { useRouter } from 'vue-router';
import { VSelect, VBtn } from 'vuetify/components';

export default {
  components: {
    VSelect,
    VBtn,
  },
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
      moods: ['Soothing', 'Chill', 'Romantic', 'Reflective', 'Happy', 'Melancholic', 'Motivational', 'Energetic', 'Sad'],
      activities: ['Sleeping', 'Meditating', 'Relaxing', 'Reading', 'Cooking', 'Commuting', 'Studying', 'Party', 'Working Out'],
      familiarities: ['Famous', 'Classics', 'Old Favorites', 'Known', 'New Discoveries', 'Not Well Known', 'Emerging Artists'],
      settings: ['By Yourself', 'Quiet Evening', 'Family Gathering', 'With Close Friends', 'Work Environment', 'Outdoor Activities', 'At the Party'],
      updateSelection,
      validateAndNext,
      goBack,
    };
  },
};
</script>

<template>
  <div class="vibe-container">
    <div class="step-heading">
      <div class="step-number">2</div>
      <h2>Select Your Vibe</h2>
    </div>
    <h3 class="description">
      Select at least two of the below settings to guide the direction of your generated playlist.
    </h3>
    <div class="input-group">
      <label for="mood">Set a mood for the playlist:</label>
      <VSelect
        id="mood"
        v-model="vibes.selectedMood"
        :items="moods"
        label="Select Mood"
        outlined
        dense
        hide-details
        class="custom-select"
        @change="updateSelection('selectedMood', $event)"
      />
    </div>
    <div class="input-group">
      <label for="activity">What activity is this music for:</label>
      <VSelect
        id="activity"
        v-model="vibes.selectedActivity"
        :items="activities"
        label="Select Activity"
        outlined
        dense
        hide-details
        class="custom-select"
        @change="updateSelection('selectedActivity', $event)"
      />
    </div>
    <div class="input-group">
      <label for="familiarity">Set your music familiarity:</label>
      <VSelect
        id="familiarity"
        v-model="vibes.selectedFamiliarity"
        :items="familiarities"
        label="Select Familiarity"
        outlined
        dense
        hide-details
        class="custom-select"
        @change="updateSelection('selectedFamiliarity', $event)"
      />
    </div>
    <div class="input-group">
      <label for="setting">Select your playlist setting:</label>
      <VSelect
        id="setting"
        v-model="vibes.selectedSetting"
        :items="settings"
        label="Select Setting"
        outlined
        dense
        hide-details
        class="custom-select"
        @change="updateSelection('selectedSetting', $event)"
      />
    </div>
    <div class="button-group">
      <VBtn class="prev-btn" @click="goBack" color="primary" outlined>
        Prev
      </VBtn>
      <VBtn class="next-btn" @click="validateAndNext" color="primary">
        Next
      </VBtn>
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
  max-width: 700px;
  margin: auto;
  overflow-y: auto;
  margin-bottom: 2rem;
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
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0 1rem;
}

.input-group label {
  margin-bottom: 0.5rem;
  color: #333;
  font-size: clamp(14px, 3.2vw, 18px);
}

.custom-select {
  width: 100%; 
}

.custom-select .v-input__control {
  border-color: #507cac;
  border-radius: 4px;
}

.custom-select .v-input__control:hover {
  border-color: #345f8d;
}

.custom-select .v-select__selections {
  color: #333;
}


.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.2rem;
  padding: 0 1rem;
}

.next-btn, .prev-btn {
  padding: 0.5rem 0.5rem;
  background-color: #507cac;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  max-width: 20vw;
  flex: 1;
  margin: 0 0.5rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.next-btn:hover, .prev-btn:hover {
  background-color: #345f8d;
  transform: translateY(-2px);
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
