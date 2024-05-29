<!-- src\components\homeDir\info-section\logError\logerrorModal.vue -->

<script>
import { ref, watch } from 'vue';
import { useErrorStore } from '@/stores/useErrorStore';

export default {
  name: "LogErrorModal",
  props: ['show'],
  setup(props) {
    const errorMessage = ref('');
    const errorStore = useErrorStore();

    const closeModal = () => {
      console.log('Closing modal');
      props.show = false; 
    };

    const submitError = async () => {
      if (errorMessage.value.trim()) {
        console.log('Submitting error:', errorMessage.value);
        await errorStore.logError(errorMessage.value);
        closeModal();
      } else {
        alert("Please enter a description of the error.");
      }
    };

    watch(() => props.show, (newVal) => {
      console.log('Modal show state:', newVal);
    });

    return { closeModal, submitError, errorMessage };
  }
};
</script>



<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Log an Error</h2>
        <textarea v-model="errorMessage" placeholder="Describe the error you encountered..."></textarea>
        <button @click="submitError">Submit Error</button>
      </div>
    </div>
  </template>
  
  <style scoped>
  .modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 50%;
  }
  .close {
    float: right;
    font-size: 1.5rem;
    cursor: pointer;
  }
  textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
  }
  button {
    background: #507cac;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  