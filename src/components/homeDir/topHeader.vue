<!-- src/components/homedir/topheader.vue -->
<script>
import { useAuthStore } from '@/stores/useAuthStore';
import { usePromptStore } from '@/stores/usePromptStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'TopHeader',
  emits: ['auth-modal-open', 'info-clicked', 'playlists-clicked', 'account-modal-open'],
  setup(props, { emit }) {
    const authStore = useAuthStore();
    const promptStore = usePromptStore();
    const router = useRouter();

    const handleAuthAction = () => {
      if (authStore.isAuthenticated) {
        emit('account-modal-open');
      } else {
        emit('auth-modal-open');
      }
    };

    const emitInfoClicked = () => {
      emit('info-clicked');
    };

    const homeClicked = () => {
      router.push('/')
      promptStore.resetStore(); 
    }

    const emitPlaylistsClicked = () => {
      emit('playlists-clicked');
    };

    const isAuthenticated = computed(() => authStore.isAuthenticated);

    return { isAuthenticated, handleAuthAction, emitInfoClicked, emitPlaylistsClicked, homeClicked };
  }
};
</script>

<template>
  <v-app-bar app color="primary" dark flat>
    <v-toolbar-title class="logo-container">
      <div class="logo-wrapper">
        <img src="@/assets/images/header/cp_logo_dark.png" alt="CoPlaylist Logo" class="logo" />
      </div>
    </v-toolbar-title>
    <v-btn icon @click="homeClicked" color="white">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn icon @click="emitInfoClicked" color="white">
      <v-icon>mdi-information</v-icon>
    </v-btn>
    <v-btn v-if="isAuthenticated" icon @click="emitPlaylistsClicked" color="white">
      <v-icon>mdi-playlist-music</v-icon>
    </v-btn>
    <v-btn icon @click="handleAuthAction" color="white">
      <v-icon v-if="isAuthenticated">mdi-logout</v-icon>
      <v-icon v-else>mdi-login</v-icon>
    </v-btn>
  </v-app-bar>
</template>

/* src/components/homeDir/topHeader.vue */
<style scoped>
.logo-container {
  display: flex;
  align-items: center;
}

.logo-wrapper {
  display: flex;
  align-items: center;
}

.logo {
  max-height: 50px;
  width: auto;
}

.ml-3 {
  margin-left: 1rem;
}

.v-btn {
  color: white;
}

.v-icon {
  font-size: 24px;
}

.v-app-bar {
  height: 64px; /* Set a consistent height for the topHeader */
}
</style>
