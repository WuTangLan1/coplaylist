<!-- src/views/homeView.vue -->
<template>
  <div class="home-view">
    <explanation-container @next="goToTone"></explanation-container>
  </div>
</template>

<script>
import ExplanationContainer from '@/components/homeDir/explanationContainer.vue';

export default {
  name: 'HomeView',
  components: {
    'explanation-container': ExplanationContainer
  },
  methods: {
    goToTone() {
      this.$router.push({ name: 'Tone' });
    }
  }
}
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ffffff;
  color: #333333;
}
</style>



