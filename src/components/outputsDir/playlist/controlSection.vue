<!-- src\components\outputsDir\playlist\controlSection.vue -->

<template>
    <div class="control-section">
      <button class="control-btn" @click="regenerate">Regenerate</button>
      <button class="control-btn" @click="save">Save</button>
      <button class="control-btn" @click="share">Share</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      regenerate() {
        this.$emit('regenerate');
      },
      save() {
        this.$emit('save');
      },
      share() {
        this.$emit('share');
      }
    }
  };
  </script>
  
  <style scoped>
  .control-section {
    display: flex;
    justify-content: space-around;
    margin-top: 1.5rem;
  }
  
  .control-btn {
    padding: 0.75rem 1.5rem;
    background-color: #507cac;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .control-btn:hover {
    background-color: #3b5998;
  }
  </style>
  