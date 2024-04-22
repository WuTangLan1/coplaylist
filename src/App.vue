<!-- src/App.vue-->
<script>
import { ref } from 'vue';
import topHeader from '@/components/homeDir/topHeader.vue'
import authmodal from '@/components/authDir/authModal.vue'
import tokensModal from '@/components/tokensDir/tokensModal.vue'
import infoModal from '@/components/homeDir/infoModal.vue'

export default { 
  components : {
    topHeader,
    authmodal,
    tokensModal,
    infoModal
  },
  setup() {
    const showAuthModal = ref(false);
    const showinfoModal = ref(false);
    const showTokensModal = ref(false);

    function openinfoModal() {
      showinfoModal.value = true;
    }

    function closeinfoModal() {
      showinfoModal.value = false;
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
      showinfoModal,
      openinfoModal,
      closeinfoModal,
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
      @info-clicked="openinfoModal"
      @tokens-clicked="openTokensModal"
    />

    <authmodal 
    v-if="showAuthModal" 
    @closeModal="closeAuthModal"
    />

    <infoModal 
    v-if="showinfoModal" 
    @closeModal="closeinfoModal"
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
 @import './assets/css/styles.css';
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 98vh;
}

.router-view-container {
  display: flex;
  align-items: center; 
  justify-content: center; 
  height: calc(90vh - 60px); 
  padding: 0.5rem;
}

@media (min-width: 500px) {
  .router-view-container {
    display: flex;
    align-items: center; 
    justify-content: center; 
    height: calc(100vh - 60px); 
    padding: 0.5rem;
}
}

</style>
