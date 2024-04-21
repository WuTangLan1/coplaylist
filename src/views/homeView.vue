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
 @import '@/assets/css/styles.css';
.home-view {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background-color: #ffffff;
  color: #333333;
}
</style>




