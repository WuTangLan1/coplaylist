<!-- src\components\inputsDir\errorModal.vue -->

  <script>
  import { usePromptStore } from '@/stores/usePromptStore';
  
  export default {
    setup() {
      const promptStore = usePromptStore();
      const modal = promptStore.modal;
      const hideModal = () => {
        promptStore.hideModal();
      };
      return { modal, hideModal };
    }
  };
  </script>

<template>
    <div v-if="modal.show" class="modal-overlay">
      <div class="modal">
        <p>{{ modal.message }}</p>
        <button @click="hideModal">Close</button>
      </div>
    </div>
  </template>
  
<style scoped>
  .modal-overlay {
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
    padding: 1rem;
    border-radius: 10px;
    width: auto;
    max-width: 80%;
    max-height: 95vh;
    overflow: auto;
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

</style>