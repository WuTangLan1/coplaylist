<!-- src/App.vue-->
<script>
import topheader from '@/components/homeDir/topHeader.vue'
import authmodal from '@/components/authDir/authModal.vue'

export default { 
  components : {
    topheader,
    authmodal
  }
}
</script>

<template>
  <div id="app">
    <topheader/>
    <authmodal/>
    <div class="router-view-container">
      <router-view/>
    </div>
  </div>
</template>

<style>
 @import '@/assets/css/styles.css';
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

.router-view-container {
    height: var(--router-view-height);
    transition: height 0.3s ease-in-out;
    overflow: auto;
}
</style>
