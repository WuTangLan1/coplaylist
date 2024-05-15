<!-- src/components/authDir/authModals/regsuccessModal.vue -->
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: Boolean
});

const emits = defineEmits(['close']);

function handleClose() {
  emits('close');
}
</script>

<template>
  <div v-if="show" class="modal-backdrop">
    <div class="modal-content">
      <h2>Registration Successful!</h2>
      <p>You have successfully registered and been awarded 3 free tokens.</p>
      <div class="token-info">
        <img src="@/assets/images/header/moretokens.png" alt="More Tokens" class="token-image" />
        <span class="token-text">3 Tokens</span>
      </div>
      <p>Please verify your email address to start generating music.</p> <!-- Added message -->
      <div class="button-container">
        <button @click="handleClose" class="close-button">Close</button>
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
  background-color: rgba(196, 194, 194, 0.6); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
}

.modal-content {
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 400px;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

h2 {
  color: #4CAF50;
  margin-bottom: 20px;
}

.token-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.token-image {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.token-text {
  font-size: 1.2rem;
  font-weight: bold;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.close-button {
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-button:hover {
  background-color: #45a049;
}
</style>
