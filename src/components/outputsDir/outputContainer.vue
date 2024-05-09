<!-- src\components\outputsDir\playlist\outputSection.vue -->

<script>
import PlaylistSection from '@/components/outputsDir/playlist/playlistSection.vue';
import ControlSection from '@/components/outputsDir/playlist/controlSection.vue';
import SaveplaylistModal from '@/components/outputsDir/playlist/saveplaylistModal.vue';
import loadingModal from '@/components/outputsDir/loadingModal.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { usePlaylistStore } from '@/stores/usePlaylistStore';
import { usePromptStore } from '@/stores/usePromptStore';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../fbDir/fbInit';
import { computed, ref } from 'vue';

export default {
  components: {
    PlaylistSection,
    ControlSection,
    SaveplaylistModal,
    loadingModal
  },
  setup() {
    const playlistStore = usePlaylistStore();
    const promptStore = usePromptStore();
    const playlist = computed(() => playlistStore.playlistDetails);
    const showLoadingModal = ref(false);

    const regeneratePlaylist = () => {
      showLoadingModal.value = true;
      promptStore.regeneratePlaylist();
      showLoadingModal.value = false;
    };

    return { playlist, regeneratePlaylist, showLoadingModal,  handleLoading: () => { showLoadingModal.value = true; },
      handleLoadingComplete: () => { showLoadingModal.value = false; }
    };
  },
  data() {
    return {
      showSaveModal: false
    };
  },
  methods : {
    savePlaylist() {
      this.showSaveModal = true;
    },
    closeSaveModal() {
      this.showSaveModal = false;
    },
    async confirmSavePlaylist(playlistName) {
      try {
        const authStore = useAuthStore();
        const playlistStore = usePlaylistStore();

        const playlistsCollection = collection(db, 'playlists');
        await addDoc(playlistsCollection, {
          creatorId: authStore.user.uid,
          name: playlistName,
          favourited: false,
          details: playlistStore.playlistDetails,
          createdAt: new Date()
        });

        this.showSaveModal = false;
      } catch (error) {
        console.error('Error saving playlist:', error);
      }
    }
  }
};
</script>


<template>
  <div class="output-container">
    <div class="step-heading">
      <h2>We have generated the following </h2>
      <div class="step-number">
        <img src="@/assets/images/output/output.png" alt="Output Image" class="heading-image">
      </div>
    </div>
    <p class="instructions">
      Use the controls below to personalize your playlist experience. 
      Click <strong>Save</strong> to give your playlist a name and add it to your library, 
      or click <strong>Regenerate</strong> to create a new playlist based on the same prompt. 
      You can use the <strong>Swap Icon</strong> up to 5 times to swap songs.
    </p>
    <div class="icon-keys">
      <div class="icon-key">
        <font-awesome-icon icon="redo" class="icon-example" />
        <span> - Swap Song</span>
      </div>
      <div class="icon-key">
        <img src="@/assets/images/music_icons/spotify.png" class="icon-example" alt="Spotify Icon" />
        <span> - Play Preview</span>
      </div>
    </div>
    <PlaylistSection :playlist="playlist" />
    <ControlSection @regenerate="regeneratePlaylist" @save="savePlaylist" @loading="handleLoading" @loading-complete="handleLoadingComplete" />
    <SaveplaylistModal v-if="showSaveModal" @close="closeSaveModal" @confirm="confirmSavePlaylist" />
    <loadingModal :show="showLoadingModal" />
  </div>
</template>

<style scoped>
.output-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background: #F4F4F4; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 700px; 
  margin: 0 auto;
  overflow-y: auto; 
}

.step-heading {
  display: flex;
  align-items: center;
  justify-content: center; 
  width: 100%;
  margin-bottom: 10px; 
}

.heading-image {
  width: 40px; 
  height: 40px; 
  margin-left: 20px; 
}

h2 {
  flex-grow: 1; 
  text-align: left; 
  margin: 0; 
  font-size: 1.4rem; 
}

.instructions {
  font-size: 0.9rem;
  color: #333;
  margin-top: 0; 
  margin-bottom: 1rem; 
  text-align: center;
}

.icon-keys {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.icon-key {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.icon-example {
  margin-right: 5px;
  width: 24px;
  height: 24px;
}
</style>

