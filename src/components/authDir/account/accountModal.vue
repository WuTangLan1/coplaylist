<!-- src\components\authDir\account\accountModal.vue -->

<script>
import userinfoSide from './userinfoSide.vue';
import tokenSide from './tokenSide.vue';
import { useAuthStore } from '@/stores/useAuthStore'; 

export default {
  components: {
    userinfoSide,
    tokenSide
  },
  data() {
    const authStore = useAuthStore();
    return {
      activeTab: 'userinfo', 
      username: authStore.user ? authStore.user.full_name : 'User' 
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
      this.closeModal();
    }
  }
};
</script>

<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal">
      <div class="modal-header">
        <h2>Welcome, {{ username }}</h2>
        <button class="close-btn" @click="closeModal">X</button>
      </div>
      <div class="tabs">
        <button :class="{active: activeTab === 'userinfo', enlarged: activeTab === 'userinfo'}" @click="activeTab = 'userinfo'">User Info</button>
        <button :class="{active: activeTab === 'tokens'}" @click="activeTab = 'tokens'">Tokens</button>
        <button class="logout-button" @click="logout">Logout</button>
      </div>
      <component :is="activeTab === 'userinfo' ? 'userinfo-side' : 'token-side'"></component>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  position: relative;
}

.tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 2rem;
}

button {
  padding: 6px 15px;
  font-size: 0.9rem; 
  background-color: #507cac;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  }


button.active, .enlarged {
  font-size: 1.05rem; /* Larger font size for active/enlarged button */
  background-color: #406fa1;
}

button:hover {
  background-color: #355981;
}

.logout-button {
  background-color: #d9534f; /* Red background for logout button */
}

.logout-button:hover {
  background-color: #c9302c;
}

.close-btn {
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  border: none;
  background: none;
  color: #333;
  font-size: 1.2rem;
  cursor: pointer;
}

.close-btn:hover {
  color: #000;
}
</style>

