<!-- src\views\discoverView.vue -->
<template>
    <div class="discover-view">
      <h1>Discover</h1>
      <div class="section">
        <h2>Top Rated</h2>
        <toprated-container />
      </div>
      <div class="section">
        <h2>Newly Generated</h2>
        <newdisc-container />
      </div>
    </div>
  </template>
  
  <script>
  import topratedContainer from "@/components/discover/toprated/topratedContainer.vue";
  import newdiscContainer from "@/components/discover/newdisc/newdiscContainer.vue";
  
  export default {
    components: {
      topratedContainer,
      newdiscContainer,
    },
  };
  </script>
  
  <style scoped>
  .discover-view {
    padding: 20px;
  }
  .section {
    margin-bottom: 40px;
  }
  h1 {
    text-align: center;
  }
  h2 {
    margin-bottom: 20px;
  }
  </style>
  