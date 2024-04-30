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
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background: white;
    padding: 1.3rem;
    border-radius: 5px;
    width: auto;
    max-width: 90vw;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
    animation: dropAnimation 1s ease-in-out forwards;
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

  </style>