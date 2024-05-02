<!-- src\components\outputsDir\playlist\outputSection.vue -->

<script>
// Importing necessary components and stores
import PlaylistSection from '@/components/outputsDir/playlist/playlistSection.vue';
import ControlSection from '@/components/outputsDir/playlist/controlSection.vue';
import SaveplaylistModal from '@/components/outputsDir/playlist/saveplaylistModal.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { usePlaylistStore } from '@/stores/usePlaylistStore';
import { usePromptStore } from '@/stores/usePromptStore';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../fbDir/fbInit';
import { computed } from 'vue';

export default {
  components: {
    PlaylistSection,
    ControlSection,
    SaveplaylistModal
  },
  setup() {
    const playlistStore = usePlaylistStore();
    const promptStore = usePromptStore();
    const playlist = computed(() => playlistStore.playlistDetails);


    const regeneratePlaylist = () => {
      promptStore.regeneratePlaylist();
    };

    const savePlaylist = () => {
      // Add logic for saving the playlist
    };
    const sharePlaylist = () => {
      // Add logic for sharing the playlist
    };

    return { playlist, regeneratePlaylist, savePlaylist, sharePlaylist };
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

        console.log('Playlist saved successfully');
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
    <h3>We generated the following:</h3>
    <p class="instructions">
      Use the controls below to personalize your playlist experience. 
      Click <strong>Save</strong> to give your playlist a name and add it to your library, 
      or click <strong>Regenerate</strong> to create a new playlist based on the same prompt.
    </p>
    <PlaylistSection :playlist="playlist" />
    <ControlSection @regenerate="regeneratePlaylist" @save="savePlaylist" />
    <SaveplaylistModal v-if="showSaveModal" @close="closeSaveModal" @confirm="confirmSavePlaylist" />
  </div>
</template>

<style scoped>
.output-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: #F4F4F4; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-height: 75vh;
  max-width: 700px; 
  margin: 0 auto;
  border: 2px solid #507cac; 
  overflow-y: auto; 
}

.instructions {
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}
</style>

