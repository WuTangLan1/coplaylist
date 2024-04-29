<!-- src\components\outputsDir\playlist\saveplaylistModal.vue -->
<script>
export default {
  data() {
    return {
      playlistName: ''
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    confirmSave() {
      if (this.playlistName.trim() !== '' && this.playlistName.length <= 15) {
        this.$emit('confirm', this.playlistName.trim());
      }
    }
  }
};
</script>

<template>
    <div class="modal-backdrop" @click.self="closeModal">
      <div class="modal">
        <h3>Save Playlist</h3>
        <p class="description">Playlist name (max 15 characters):</p>
        <input type="text" v-model="playlistName" placeholder="Enter playlist name" maxlength="15" />
        <div class="modal-actions">
          <button @click="confirmSave" :disabled="!playlistName.trim()">Confirm</button>
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
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: dropAnimation 0.5s ease-in-out forwards;
    position: relative;
}

.description {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 10px;
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box; /* Adds padding without affecting the width */
}

button {
    padding: 10px 20px;
    border: none;
    background-color: #007BFF;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
}

@keyframes dropAnimation {
    0% {
        transform: translateY(-50%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
