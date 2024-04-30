<!-- src\components\authDir\musicPreferences.vue -->
<script>
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  setup() {
    const authStore = useAuthStore();
    const inputs = reactive([
      { id: 'likes_artists', label: 'Artists I Like', model: [] },
      { id: 'dislikes_artists', label: 'Artists I Dislike', model: [] },
      { id: 'likes_songs', label: 'Songs I Like', model: [] },
      { id: 'dislikes_songs', label: 'Songs I Dislike', model: [] }
    ]);

    function checkLimit(input) {
      if (input.model.length > 5) {
        input.model = input.model.slice(0, 5);
      }
    }

    async function savePreferences() {
      const preferences = {
        likes_artists: inputs[0].model,
        dislikes_artists: inputs[1].model,
        likes_songs: inputs[2].model,
        dislikes_songs: inputs[3].model
      };
      try {
        await authStore.updateUserProfile(preferences);
      } catch (error) {
        console.error("Failed to save music preferences", error);
      }
    }

    return { inputs, checkLimit, savePreferences };
  }
};
</script>

<template>
    <div class="preferences-container">
      <h2>Music Preferences</h2>
      <div v-for="(input, index) in inputs" :key="index">
        <div class="form-group">
          <label :for="input.id">{{ input.label }}</label>
          <input :id="input.id" v-model="input.model" @input="checkLimit(input)">
          <small v-if="input.model.length >= 5">Maximum of 5 entries reached</small>
        </div>
      </div>
      <button @click="savePreferences">Save Preferences</button>
    </div>
  </template>
  
  <style scoped>
  .preferences-container {
    padding: 20px;
    background: #f0f0f0;
    border-radius: 10px;
    margin-top: 1rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  