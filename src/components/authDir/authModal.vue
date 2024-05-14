<!-- src\components\authDir\authModal.vue -->
<script>
import { computed, ref, watch } from 'vue';
import RegSide from './regSide.vue';
import LogSide from './logSide.vue';
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  components: {
    RegSide,
    LogSide
  },
  setup(props, { emit }) {
    const currentComponent = ref('RegSide');
    const authStore = useAuthStore();

    const toggleButtonText = computed(() => {
      return currentComponent.value === 'RegSide' ? 'Log In' : 'Register';
    });

    function toggleComponent() {
      currentComponent.value = currentComponent.value === 'RegSide' ? 'LogSide' : 'RegSide';
    }

    function closeModal() {
      emit('closeModal');
    }

    return {
      currentComponent,
      toggleComponent,
      closeModal,
      toggleButtonText 
    };
  }
};
</script>

<template>
    <div class="modal-backdrop">
      <div class="modal">
        <button @click="toggleComponent" class="toggle-button">
          Switch to {{ toggleButtonText }}
        </button>
        <button class="close-button" @click="closeModal">✕</button>
        <component :is="currentComponent"></component>
      </div>
    </div>
  </template>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background: white;
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 5px;
    width: auto;
    max-width: 90vw;
    max-height: 90vh;
    width: 80%;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
    animation: dropAnimation 1s ease-in-out forwards;
    position: relative;
  }


  @keyframes dropAnimation {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .toggle-button {
      background-color: #759acd; 
      color: #ffffff;
      padding: 0.3rem 0.5rem;
      border-radius: 5px;
      border: 1px solid #ccc; 
      font-weight: bold; 
      position: absolute;
      top: 20px; 
      left: 50%; 
      transform: translateX(-50%); 
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

  .close-button {
    position: absolute;
    background: none;
    right: 0;
    top:0;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .close-button:hover {
    transform: rotate(180deg);
  }

  </style>