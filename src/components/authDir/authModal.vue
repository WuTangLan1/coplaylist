<!-- src/components/authDir/authModal.vue -->
<script>
import { computed, ref } from 'vue';
import RegSide from './regSide.vue';
import LogSide from './logSide.vue';
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  components: {
    RegSide,
    LogSide
  },
  emits: ['closeModal'],
  setup(props, { emit }) {
    const currentComponent = ref('RegSide');
    const authStore = useAuthStore();
    const dialogVisible = ref(true);  // Reactive variable to control dialog visibility

    const toggleButtonText = computed(() => {
      return currentComponent.value === 'RegSide' ? 'Log In' : 'Register';
    });

    function toggleComponent() {
      currentComponent.value = currentComponent.value === 'RegSide' ? 'LogSide' : 'RegSide';
    }

    function closeModal() {
      dialogVisible.value = false;  // Close the dialog
      emit('closeModal');
    }

    return {
      currentComponent,
      toggleComponent,
      closeModal,
      toggleButtonText,
      dialogVisible
    };
  }
};
</script>

<template>
  <v-dialog v-model="dialogVisible" persistent max-width="600px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <v-btn text color="primary" @click="toggleComponent">
          Switch to {{ toggleButtonText }}
        </v-btn>
        <v-btn icon @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <component :is="currentComponent" @closeModal="closeModal"></component>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-card-title {
  padding: 0.5rem 1rem;
}

.v-btn {
  margin: 0;
}

.v-btn.text {
  font-weight: bold;
}

.v-btn.icon {
  color: #ff0000;
  padding: 0;
}

.v-icon {
  font-size: 1.5rem;
}

.v-card-text {
  padding: 1rem;
}
</style>
