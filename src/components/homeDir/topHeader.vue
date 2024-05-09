
<!-- src\components\homedir\topheader.vue -->
<script>
import { useAuthStore } from '@/stores/useAuthStore';
import { usePromptStore } from '@/stores/usePromptStore';


export default {
  name: 'TopHeader',
  emits: ['auth-modal-open', 'info-clicked', 'playlists-clicked', 'account-modal-open'],
  setup(props, { emit }) {
    const authStore = useAuthStore();
    const promptStore = usePromptStore();

    const handleAuthAction = () => {
      if (authStore.user) {
        emit('account-modal-open');
      } else {
        emit('auth-modal-open');
      }
    };

    const emitInfoClicked = () => {
      emit('info-clicked');
    };

    const homeClicked = () => {
      promptStore.resetStore(); 
    }

    const emitPlaylistsClicked = () => {
      emit('playlists-clicked');
    };

    return { authStore, handleAuthAction, emitInfoClicked, emitPlaylistsClicked, homeClicked };
  }
};
</script>

<template>
  <header class="top-header">
    <div class="logo-container">
      <img src="@/assets/images/header/cp_logo.png" alt="Mapple Logo" class="logo"/>
    </div>
    <nav class="navigation">
      <router-link to="/" class="nav-link" @click="homeClicked">
        <img src="@/assets/images/header/home.png" alt="Home" class="nav-icon"/>
      </router-link>
      <div class="nav-link" @click="emitInfoClicked">
        <img src="@/assets/images/header/info.png" alt="Info" class="nav-icon"/>
      </div>
      <div v-if="authStore.isAuthenticated" class="nav-link" @click="emitPlaylistsClicked">
        <img src="@/assets/images/header/playlist.png" alt="playlist" class="nav-icon"/>
      </div>
      <div class="nav-link" @click="handleAuthAction">
        <img v-if="authStore.user" src="@/assets/images/header/logout.png" alt="Logout" class="nav-icon"/>
        <img v-else src="@/assets/images/header/login.png" alt="Reg/Login" class="nav-icon"/>
      </div>
    </nav>
  </header>
</template>


<style scoped>
 @import '@/assets/css/styles.css';
.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  background-color: #C3D7F8;
  width: 100%;
  color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
  margin-bottom: 20px;
}

.logo-container {
  flex: 0 0 auto;
}

.logo {
  height: auto;
  width: auto;
  max-height: clamp(22px, 8vw, 45px); 
}

@media (min-width: 450px) {
  .logo {
    max-height: clamp(22px, 9vw, 40px); 
      }
}



.navigation {
  display: flex;
  gap: 0.4rem; 
}

.nav-link {
  text-decoration: none;
  color: black;
  padding: 0.2em 0.8em; 
  border-radius: 10px; 
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.nav-icon {
  height: clamp(20px, 6vw, 35px);
  width: auto;
  transition: transform 0.3s ease;
}

@media (max-width: 400px) {
  .nav-icon {
      height: clamp(25px, 3vw, 30px);
    }
}


.nav-link:hover .nav-icon {
  transform: scale(1.3); 
}

@media (max-width: 400px) {
  .navigation {
    gap: 0.1rem;
  }
}


</style>