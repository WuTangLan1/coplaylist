<!-- C:\Users\finnm\OneDrive\Documents\GitHub\coplaylist\src\App.vue -->
<script>
import { ref } from 'vue';
import topHeader from '@/components/homeDir/topHeader.vue';
import bottomFooter from '@/components/homeDir/bottomFooter.vue';
import authModal from '@/components/authDir/authModal.vue';
import infoModal from '@/components/homeDir/info-section/infoModal.vue';
import errorModal from '@/components/inputsDir/errorModal.vue';
import PlaylistModal from './components/homeDir/my-playlists/playlistModal.vue';
import accountModal from '@/components/authDir/account/accountModal.vue';

export default { 
  components: {
    topHeader,
    authModal,
    PlaylistModal,
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
      showPlaylists.value = false; 
    }

    function closeinfoModal() {
      showinfoModal.value = false;
    }

    function openPlaylists() {
      showPlaylists.value = true;
      showinfoModal.value = false; 
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
      currentInfoComponent.value = newComponent;  
    }

    function handleInfoClicked() {
      openinfoModal();
      closePlaylists();
    }

    function handlePlaylistsClicked() {
      openPlaylists();
      closeinfoModal();
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
      handleComponentChange,
      handleInfoClicked,
      handlePlaylistsClicked
    };
  }
}
</script>

<template>
  <v-app>
    <div id="app">
      <top-header
        @auth-modal-open="openAuthModal"
        @info-clicked="handleInfoClicked"
        @playlists-clicked="handlePlaylistsClicked"
        @account-modal-open="openAccountModal"
      />

      <auth-modal 
        v-if="showAuthModal" 
        @closeModal="closeAuthModal"
      />

      <info-modal 
        v-if="showinfoModal"
        :current-component="currentInfoComponent"
        @update:currentComponent="handleComponentChange"
        @closeModal="closeinfoModal"
      />

      <playlist-modal
        v-if="showPlaylists" 
        @closeModal="closePlaylists"
      />

      <error-modal></error-modal>

      <account-modal
        v-if="showAccountModal"
        @closeModal="closeAccountModal" 
      />

      <div class="router-view-container">
        <router-view/>
      </div>

      <bottom-footer @openModal="handleModalOpen"/>
    </div>
  </v-app>
</template>

<style>
@import 'vuetify/styles';
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
  width: 100%;
  min-height: 70vh;
  overflow-y: auto;
  padding-top: 64px; /* Adjust padding to match the height of the topHeader */
}

@media (min-width: 500px) {
  .router-view-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 200px);
    padding: 0.5rem;
    padding-top: 64px; /* Adjust padding to match the height of the topHeader */
  }
}


</style>
