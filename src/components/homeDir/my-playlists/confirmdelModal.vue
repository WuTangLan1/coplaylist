<!-- src\components\homeDir\my-playlists\confirmdelModal.vue -->
<script>
export default {
  methods: {
    closeModal() {
      this.$emit('close');
    },
    confirmDelete() {
      this.$emit('confirm');
    }
  }
}
</script>

<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal">
      <h3>Confirm Delete</h3>
      <p>Are you sure you want to delete this playlist?</p>
      <div class="modal-actions">
        <button class="cancel-button" @click="closeModal">Cancel</button>
        <button class="confirm-button" @click="confirmDelete">Delete</button>
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

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.cancel-button,
.confirm-button {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button {
  background-color: #e0e0e0;
  color: #333;
  border: none;
  margin-right: 10px;
}

.cancel-button:hover {
  background-color: #d0d0d0;
}

.confirm-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
}

.confirm-button:hover {
  background-color: #e60000;
}

</style>