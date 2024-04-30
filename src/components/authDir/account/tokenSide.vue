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
      <h2>Coming Soon</h2>
      <p>This feature is under development and will be available soon. Our team is working hard to bring you new and exciting functionalities.</p>
      <p>Stay tuned for updates, and thank you for your patience!</p>
    </div>
  </template>
  
  <style scoped>
  .token-management {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
  </style>
  