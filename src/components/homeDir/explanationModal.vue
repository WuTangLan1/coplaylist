<!-- src\components\homeDir\explanationModal.vue -->
<script>
export default {
  emits: ['closeModal'],
  methods: {
    closeModal() {
      this.$emit('closeModal');
    }
  }
};
</script>

<template>
    <div class="modal-backdrop" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <img src="@/assets/images/header/info.png" alt="Info" class="info-icon"/>
          <h2>Information</h2>
          <button @click="closeModal" class="close-button">✕</button>
        </div>
        <div class="modal-body">
          <h3>Welcome to Harmonize!</h3>
          <p>This application creates personalized music playlists based on your mood, favorite genres, preferred musical eras, and current activities. Simply input your preferences and let Harmonize do the rest!</p>
          <p>Feel free to explore different settings to see how our smart algorithms tailor music just for you.</p>
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
  
  .modal-header {
    display: flex;
    align-items: center; /* Align items centrally */
    justify-content: space-between;
    padding-right: 40px; /* Allow space for the close button */
  }
  
  .modal-body {
    margin-top: 20px;
    font-size: 1rem;
  }
  
  .info-icon {
    height: 60px; 
    margin-right: 1rem; /* Space between icon and title */
  }
  
  .close-button {
    position: absolute;
    top: 0px;
    right: 0px;
    background: none;
    border: none;
    font-size: 2rem;
    color: #507cac; /* Set the color to blue */
    cursor: pointer;
    transition: color 0.2s ease-in-out;
  }
  
  .close-button:hover {
    color: #345f8d; /* A darker blue for hover state */
  }
  </style>
  