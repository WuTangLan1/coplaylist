<!-- src\components\discover\playlist\playlistinfoModal.vue -->
<script>
export default {
  name: "PlaylistInfoModal",
  props: {
    playlist: {
      type: Object,
      default: () => ({}), // Provide a default empty object
    },
    visible: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false); 
    }
  }
};
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <h3>{{ playlist.name }} - {{ playlist.creatorName }} - {{ playlist.displayGenre }}</h3>
      </div>
      <div class="modal-body">
        <ul>
          <li v-for="(song, index) in playlist.songs || []" :key="index">
            {{ song }}
          </li>
        </ul>
      </div>
      <div class="modal-footer">
        <button @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.75); /* Darker background */
}

.modal {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  max-width: 90%;
  max-height: 80vh;
  overflow-y: auto; /* Scrollable content */
}

.modal-header, .modal-footer {
  padding: 0.5rem;
  text-align: center;
}

.modal-body {
  margin: 1rem 0;
}

h3 {
  font-size: 1.2rem;
  color: #333;
  margin: 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 10px;
  padding: 0.5rem;
  transition: background-color 0.3s;
}

li:hover {
  background-color: #f0f0f0; /* Hover effect for list items */
}

button {
  padding: 0.8rem 1.6rem;
  margin-top: 20px;
  cursor: pointer;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}
</style>