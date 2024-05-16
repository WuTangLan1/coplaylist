<!-- src\views\discoverView.vue -->
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

<style scoped>
.discover-view {
  padding: 1rem;
  max-width: 89vw;
  background: linear-gradient(to bottom, #b3b4ee, #abc7df); /* Light blue gradient background */
  border-radius: 10px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
