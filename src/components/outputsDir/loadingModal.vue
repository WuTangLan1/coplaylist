<!-- src\components\outputsDir\loadingModal.vue -->

<script>
export default {
  name : "loadingModal",
  props: {
    show: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<template>
    <div v-if="show" class="modal-overlay">
      <div class="modal-content">
        <img src="@/assets/images/loading/loading.gif" alt="Loading" />
        <p>Generating Playlist...</p>
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
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .modal-content {
    background: #fff;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .modal-content img {
    width: 80px;
    height: 80px;
    margin-bottom: 1rem;
  }
  
  .modal-content p {
    font-size: 1.2rem;
    color: #333;
  }
  </style>
  