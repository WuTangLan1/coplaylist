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
      username: authStore.user.first_name ? authStore.user.first_name : 'User'
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
        <h2 class="modal-title">Welcome, {{ username }}</h2>
        <v-btn icon @click="closeModal" class="close-btn">
          <v-icon>mdi-close</v-icon>
        </v-btn>
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
  width: 90%;
  max-width: 600px;
  max-height: 75vh;
  overflow-y: auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  position: relative;
}

@media(max-width: 600px)
{
  .modal {
    margin-top: 2.5rem;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f3f3f4;
  border-radius: 0.5rem;
}

.modal-title {
  font-size: 26px;
  font-weight: bold;
  color: #000000;
  margin: 0;
}

.close-btn {
  background-color: #f44336;
  color: #ffffff;
  border-radius: 50%;
  min-width: 26px;
  min-height: 26px;
  max-width: 32px;
  max-height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-btn:hover {
  background-color: #d32f2f;
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

</style>

