<!-- src\components\authDir\account\tokenSide.vue -->

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  setup() {
    const authStore = useAuthStore();
    const tokens = ref(authStore.user.tokens);

    return {
      tokens
    };
  }
};
</script>

<template>
    <div class="token-management">
      <h2>Token Management</h2>
      <p>Current Tokens: {{ tokens }}</p>
    </div>
  </template>
  
  <style scoped>
  .token-management {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  </style>
  