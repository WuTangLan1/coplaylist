<!-- src\components\outputsDir\playlist\controlSection.vue -->

<script>
import { usePromptStore } from '@/stores/usePromptStore';
import { computed } from 'vue';

export default {
  emits: ['loading', 'loading-complete'],
  setup(props, { emit }) {
    const promptStore = usePromptStore();
    const regenerateDisabled = computed(() => promptStore.regenerateAttempts >= 2);

    const regenerate = async () => {
      emit('loading'); 
      await promptStore.regeneratePlaylist();
      emit('loading-complete'); 
    };

    return {
      regenerate,
      regenerateDisabled,
      save: () => emit('save'),
    };
  }
};
</script>

<template>
  <div class="control-section">
    <button class="regen-btn" @click="regenerate" :disabled="regenerateDisabled">
      <img src="@/assets/images/header/tokens.png" alt="Token" class="token-icon"> Regenerate
    </button>
    <button class="save-btn" @click="save">Save</button>
  </div>
</template>


  <style scoped>
  .control-section {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    width:100%
  }

  .save-btn  {
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

  .regen-btn  {
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
      width: 20px;  /* Adjust size as necessary */
      height: auto;
      margin-right: 5px; /* Space between the icon and the text */
      vertical-align: middle;
    }

  .share-btn  {
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
  