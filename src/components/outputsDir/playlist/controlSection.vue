<!-- src\components\outputsDir\playlist\controlSection.vue -->

<template>
  <div class="control-section">
    <button class="regen-btn" @click="regenerate">⟳ Regenerate</button>
    <button class="save-btn" @click="save">💾 Save</button>
    <button class="share-btn" @click="share">🔗 Share</button>
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
    justify-content: space-between;
    margin-top: 0.5rem;
    width:100%
  }

  .save-btn  {
    padding: 0.5rem 1rem;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: #0d7a25;
  }
  
  .save-btn:hover {
    background-color: #15662d;
  }

  .regen-btn  {
    padding: 0.5rem 1rem;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: #3b558d;
  }
  
  .regen-btn:hover {
    background-color: #1e315a;
  }

  .share-btn  {
    padding: 0.5rem 1rem;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: #73288a;
  }
  
  .share-btn:hover {
    background-color: #2f1470;
  }
  </style>
  