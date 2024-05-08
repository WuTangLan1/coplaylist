<!-- src/App.vue-->
<script>
import { ref } from 'vue';
import topHeader from '@/components/homeDir/topHeader.vue'
import bottomFooter from '@/components/homeDir/bottomFooter.vue'
import authmodal from '@/components/authDir/authModal.vue'
import infoModal from '@/components/homeDir/info-section/infoModal.vue'
import errorModal from '@/components/inputsDir/errorModal.vue'
import PlaylistContainer from './components/homeDir/my-playlists/playlistContainer.vue';
import accountModal from '@/components/authDir/account/accountModal.vue'

export default { 
  components : {
    topHeader,
    authmodal,
    PlaylistContainer,
    infoModal,
    errorModal,
    accountModal,
    bottomFooter
  },
  setup() {
    const showAuthModal = ref(false);
    const showinfoModal = ref(false);
    const showPlaylists = ref(false);
    const showAccountModal = ref(false); 
    const currentInfoComponent = ref('AboutSection');

    function openinfoModal() {
      showinfoModal.value = true;
    }

    function closeinfoModal() {
      showinfoModal.value = false;
    }

    function openPlaylists() {
      showPlaylists.value = true;
    }

    function closePlaylists() {
      showPlaylists.value = false;
    }

    function openAuthModal() {
      showAuthModal.value = true;
    }

    function closeAuthModal() {
      showAuthModal.value = false;
    }

    function openAccountModal() {  
      showAccountModal.value = true;
    }

    function closeAccountModal() {  
      showAccountModal.value = false;
    }

    function handleModalOpen(component) {
      currentInfoComponent.value = component;
      showinfoModal.value = true;
    }

    function handleComponentChange(newComponent) {
    currentInfoComponent.value = newComponent;  // Update the reactive reference correctly
    }

    return {
      showAuthModal,
      showinfoModal,
      openinfoModal,
      closeinfoModal,
      showPlaylists,
      openPlaylists,
      closePlaylists,
      openAuthModal,
      closeAuthModal,
      showAccountModal,
      openAccountModal,
      closeAccountModal,
      currentInfoComponent,
      handleModalOpen,
      handleComponentChange
      }
  }
}
</script>

<template>
  <div id="app">
    <top-Header
      @auth-modal-open="openAuthModal"
      @info-clicked="openinfoModal"
      @playlists-clicked="openPlaylists"
      @account-modal-open="openAccountModal"
    />

    <authmodal 
    v-if="showAuthModal" 
    @closeModal="closeAuthModal"
    />

    <infoModal 
      v-if="showinfoModal"
      :current-component="currentInfoComponent"
      @update:currentComponent="handleComponentChange"
      @closeModal="closeinfoModal"
    />

    <PlaylistContainer
     v-if="showPlaylists" 
     @closeModal="closePlaylists"
     />

     <errorModal></errorModal>

     <accountModal
      v-if="showAccountModal"
      @closeModal="closeAccountModal" 
    />

    <div class="router-view-container">
      <router-view/>
    </div>

    <bottomFooter @openModal="handleModalOpen"/>
  </div>
</template>

<style>
 @import './assets/css/styles.css';
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.router-view-container {
  display: flex;
  align-items: center; 
  justify-content: center; 
  align-content: center;
  align-self: center;
  width:100%;
  min-height: 70vh;
  overflow-y: auto;
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
