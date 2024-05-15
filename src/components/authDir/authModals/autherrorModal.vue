<!-- src/components/authDir/authModals/autherrorModal.vue -->
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    errorMessage: {
      type: String,
      required: true
    }
  },
  emits: ['close']
};
</script>

<template>
  <div v-if="show" class="modal-backdrop">
    <div class="modal">
      <button class="close-button" @click="$emit('close')">✕</button>
      <h2>Error</h2>
      <p>{{ errorMessage }}</p>
      <div class="button-container">
        <button class="ok-button" @click="$emit('close')">That's cool</button>
      </div>
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
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.close-button {
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;
}

.close-button:hover {
  color: #ff5a5a;
}

h2 {
  color: #d9534f;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

p {
  color: #333;
  margin-bottom: 20px;
  font-size: 1rem;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.ok-button {
  background-color: #5775c8;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.ok-button:hover {
  background-color: #412cc9;
}
</style>
