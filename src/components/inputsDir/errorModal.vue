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
      <h2>Error</h2>
      <div class="modal-content">
        <p>{{ modal.message }}</p>
      </div>
      <div class="modal-footer">
        <button class="close-button" @click="hideModal">Close</button>
      </div>
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
  width: 80%;
  max-width: 80vw;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  animation: dropAnimation 1s ease-in-out forwards;
  position: relative;
}

.modal-content {
  overflow-y: auto;
}

.modal-footer {
  text-align: right; 
  margin-top: 1rem; 
}

.close-button {
  padding: 0.5rem 1rem;
  background-color: #c05151;
  color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.close-button:hover {
  background-color: #e5e7eb; /* A slight hover effect for the button */
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
