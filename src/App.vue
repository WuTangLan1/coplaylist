<!-- src/App.vue-->
<script>
import { ref } from 'vue';
import topHeader from '@/components/homeDir/topHeader.vue'
import authmodal from '@/components/authDir/authModal.vue'

export default { 
  components : {
    topHeader,
    authmodal
  },
  setup() {
    const showAuthModal = ref(false);

    function openAuthModal() {
      showAuthModal.value = true;
    }

    function closeAuthModal() {
      showAuthModal.value = false;
    }


    return {showAuthModal, openAuthModal, closeAuthModal}
  }
}
</script>

<template>
  <div id="app">
    <top-Header @auth-modal-open="openAuthModal"/>
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
