<!-- src/App.vue-->
<script>
import { ref } from 'vue';
import topHeader from '@/components/homeDir/topHeader.vue'
import authmodal from '@/components/authDir/authModal.vue'
import tokensModal from '@/components/tokensDir/tokensModal.vue'
import explanationModal from '@/components/homeDir/explanationModal.vue'

export default { 
  components : {
    topHeader,
    authmodal,
    tokensModal,
    explanationModal
  },
  setup() {
    const showAuthModal = ref(false);
    const showExplanationModal = ref(false);
    const showTokensModal = ref(false);

    function openExplanationModal() {
      showExplanationModal.value = true;
    }

    function closeExplanationModal() {
      showExplanationModal.value = false;
    }

    function openTokensModal() {
      showTokensModal.value = true;
    }

    function closeTokensModal() {
      showTokensModal.value = false;
    }

    function openAuthModal() {
      showAuthModal.value = true;
    }

    function closeAuthModal() {
      showAuthModal.value = false;
    }


    return {
      showAuthModal,
      showExplanationModal,
      openExplanationModal,
      closeExplanationModal,
      showTokensModal,
      openTokensModal,
      closeTokensModal,
      openAuthModal,
      closeAuthModal}
  }
}
</script>

<template>
  <div id="app">
    <top-Header
      @auth-modal-open="openAuthModal"
      @info-clicked="openExplanationModal"
      @tokens-clicked="openTokensModal"
    />

    <authmodal 
    v-if="showAuthModal" 
    @closeModal="closeAuthModal"
    />

    <explanationModal 
    v-if="showExplanationModal" 
    @closeModal="closeExplanationModal"
    />

    <tokensModal
     v-if="showTokensModal" 
     @closeModal="closeTokensModal"
     />

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
