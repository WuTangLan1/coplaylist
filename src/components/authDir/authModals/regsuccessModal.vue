<!-- src\components\authDir\authModals\regsuccessModal.vue -->
<script setup>
import { defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  show: Boolean
});

const emits = defineEmits(['close']);

watch(() => props.show, (newVal) => {
  console.log("Modal show state changed to:", newVal);
});

function handleClose() {
  emits('close');
}
</script>


<template>
    <div v-if="show" class="modal-backdrop">
      <div class="modal-content">
        <h2>Registration Successful!</h2>
        <p>You have successfully registered and been awarded 3 free tokens.</p>
        <button @click="handleClose">Close</button>
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
  background-color: rgba(255, 0, 0, 0.6); 
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
}
</style>
