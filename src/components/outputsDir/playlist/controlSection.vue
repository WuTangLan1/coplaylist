<!-- src\components\outputsDir\playlist\controlSection.vue -->

<script>
import { usePromptStore } from '@/stores/usePromptStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { computed } from 'vue';
import tokenImg from '@/assets/images/header/tokens.png'; 
import tokensImg from '@/assets/images/header/moretokens.png'; 

export default {
  emits: ['loading', 'loading-complete'],
  setup(props, { emit }) {
    const promptStore = usePromptStore();
    const authStore = useAuthStore();
    const regenerateDisabled = computed(() => promptStore.regenerateAttempts >= 1);

    const regenerate = async () => {
      emit('loading'); 
      await promptStore.regeneratePlaylist();
      emit('loading-complete'); 
    };

    return {
      regenerate,
      regenerateDisabled,
      save: () => emit('save'),
      authStore,
      tokenImg,
      tokensImg,
    };
  }
};
</script>


<template>
  <div class="control-section">
    <button class="regen-btn" @click="regenerate" :disabled="regenerateDisabled">
      <img src="@/assets/images/header/tokens.png" alt="Token" class="token-icon">1 Regenerate
    </button>
    <div v-if="authStore.user" class="token-display">
      <img
        :src="authStore.user.tokens === 1 ? tokenImg : tokensImg"
        alt="Tokens"
      />
      <span>{{ authStore.user.tokens }}</span>
    </div>
    <button class="save-btn" @click="save">Save</button>
  </div>
</template>



  <style scoped>
 .control-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  width: 100%;
}

.token-display {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px; /* Adjust spacing to your liking */
  border: 1px solid #ccc; 
  padding: 5px 10px; 
  border-radius: 5px; 
  background-color: #fff; 
}

.token-display img {
  width: 20px; 
  margin-right: 5px; 
}

.token-display span {
  font-size: 1rem; 
  color: #333;
  font-weight: bold;
}

.save-btn {
  padding: 0.5rem 1rem;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #0d7a25;
}

.save-btn:hover {
  background-color: #15662d;
}

.regen-btn {
  padding: 0.5rem 1rem;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #3b558d;
}

.regen-btn[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.regen-btn:hover {
  background-color: #1e315a;
}

.token-icon {
  width: 20px; 
  height: auto;
  margin-right: 5px; 
  vertical-align: middle;
}

.share-btn {
  padding: 0.5rem 1rem;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #73288a;
}

.share-btn:hover {
  background-color: #2f1470;
}
</style>

  