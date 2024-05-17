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
      <div class="modal-content">
        <h3>{{ playlist.name }} -- {{ playlist.creatorName }} -- {{ playlist.displayGenre }}</h3>
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
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Aligns children (content and footer) on the main axis */
}

.modal-content {
  overflow-y: auto; /* Ensures content is scrollable if it overflows */
}

.modal-footer {
  display: flex;
  justify-content: flex-end; /* Aligns the close button to the right */
  padding-top: 1rem; /* Adds space between content and the button */
}

button {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>
