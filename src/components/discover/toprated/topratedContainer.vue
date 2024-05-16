<!-- src\components\discover\toprated\topratedContainer.vue -->

<template>
    <div class="toprated-container">
      <toprated-playlist v-for="n in 3" :key="n" />
    </div>
  </template>
  
  <script>
  import topratedPlaylist from "@/components/discover/toprated/topratedPlaylist.vue";
  
  export default {
    components: {
      topratedPlaylist,
    },
  };
  </script>
  
  <style scoped>
  .toprated-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  </style>
  