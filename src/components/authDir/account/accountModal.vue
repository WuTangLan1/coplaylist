<!-- src\components\authDir\account\accountModal.vue -->

<script>
import userinfoSide from './userinfoSide.vue';
import tokenSide from './tokenSide.vue';

export default {
  components: {
    userinfoSide,
    tokenSide
  },
  data() {
    return {
      activeTab: 'userinfo'
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    }
  }
};
</script>

<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal">
      <div class="tabs">
        <button :class="{active: activeTab === 'userinfo'}" @click="activeTab = 'userinfo'">User Info</button>
        <button :class="{active: activeTab === 'tokens'}" @click="activeTab = 'tokens'">Tokens</button>
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
  background-color: rgba(0, 0, 0, 0.75); /* Darker backdrop */
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

@keyframes dropAnimation {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #507cac;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button.active {
  background-color: #406fa1;
}

button:hover {
  background-color: #355981;
}
</style>
