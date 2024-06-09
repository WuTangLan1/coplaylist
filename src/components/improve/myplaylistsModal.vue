<!-- src\components\improve\myplaylistsModal.vue -->

<script>
export default {
  props: ['playlists'],
  data() {
    return {
      showModal: true 
    };
  },
  methods: {
    close() {
      this.showModal = false;
    }
  }
}
</script>

<template>
  <div v-if="showModal">
    <h1>Playlist Modal</h1>
    <ul>
      <li v-for="playlist in playlists" :key="playlist.id">{{ playlist.name }}</li>
    </ul>
    <button @click="close">Close</button>
  </div>
</template>



  
  <style scoped>
  </style>
  