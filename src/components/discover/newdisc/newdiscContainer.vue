<!-- src\components\discover\newdisc\newdiscContainer.vue -->

<template>
    <div class="newdisc-container">
      <newdisc-playlist v-for="n in 3" :key="n" />
    </div>
  </template>
  
  <script>
  import newdiscPlaylist from "@/components/discover/newdisc/newdiscPlaylist.vue";
  
  export default {
    components: {
      newdiscPlaylist,
    },
  };
  </script>
  
  <style scoped>
  .newdisc-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  </style>
  