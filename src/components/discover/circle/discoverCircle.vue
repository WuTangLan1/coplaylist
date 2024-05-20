<!-- src\components\discover\circle\discoverCircle.vue -->

<template>
    <div class="rotating-circle">
      <div v-for="(playlist, index) in allPlaylists" :key="index" 
           :class="['playlist-item', {'top-half': index < allPlaylists.length / 2, 'bottom-half': index >= allPlaylists.length / 2}]"
           :style="getStyle(index)"
           @click="showModal(playlist)">
        <span class="playlist-name">{{ playlist.name }}</span> by
        <span class="creator-name">{{ playlist.creatorName }}</span>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, ref } from 'vue';
  
  export default {
    name: 'RotatingCircle',
    props: {
      newDiscoveries: Array,
      topRatedPlaylists: Array,
    },
    setup(props, { emit }) {
      const radius = ref(200); // Adjust radius to fit your design
      const allPlaylists = computed(() => [...props.newDiscoveries, ...props.topRatedPlaylists]);
      const angleIncrement = computed(() => 360 / allPlaylists.value.length);
  
      const getStyle = (index) => {
        const angle = index * angleIncrement.value;
        return {
          transform: `rotate(${angle}deg) translate(${radius.value}px) rotate(${-angle}deg)`
        };
      };
  
      const showModal = (playlist) => {
        emit('show-modal', playlist);
      };
  
      return {
        allPlaylists,
        getStyle,
        showModal,
      };
    },
  };
  </script>
  
  <style scoped>
  .rotating-circle {
    position: relative;
    width: 500px; /* Adjust as necessary */
    height: 500px; /* Adjust as necessary */
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .playlist-item {
    position: absolute;
    width: 100px; /* Adjust as necessary */
    height: 100px; /* Adjust as necessary */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, top 0.3s;
    cursor: pointer;
  }
  
  .top-half {
    top: 50%;
  }
  
  .bottom-half {
    bottom: 50%;
  }
  
  .playlist-name {
    font-weight: bold;
  }
  
  .creator-name {
    color: #666;
  }
  </style>
  