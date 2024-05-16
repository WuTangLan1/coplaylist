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
      <h3>{{ playlist.name }}</h3>
      <ul>
        <li v-for="(song, index) in playlist.details || []" :key="index">
          "{{ song.title }}" by {{ song.artist }} ({{ song.releaseYear }})
        </li>
      </ul>
      <button @click="close">Close</button>
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
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 500px;
}

h3 {
  margin-top: 0;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
}
</style>
