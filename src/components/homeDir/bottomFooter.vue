<!-- src/components/homeDir/bottomFooter.vue -->
<script>
import { ref } from 'vue';

export default {
  setup() {
    const showinfoModal = ref(false);
    const currentInfoComponent = ref('AboutSection'); 

    function openModal(component) {
      currentInfoComponent.value = component;
      showinfoModal.value = true;
    }

    function closeinfoModal() {
      showinfoModal.value = false;
    }

    return {
      showinfoModal,
      currentInfoComponent,
      openModal,
      closeinfoModal,
    };
  }
}
</script>

<template>
  <v-footer class="bottom-footer" padless>
    <v-container fluid>
      <v-row class="footer-content" justify="center">
        <v-col cols="4" md="4" class="footer-links">
          <v-btn text @click="$emit('openModal', 'AboutSection')" class="footer-link">About</v-btn>
          <v-btn text @click="$emit('openModal', 'TosSection')" class="footer-link">TOS</v-btn>
          <v-btn text @click="$emit('openModal', 'PrivacySection')" class="footer-link">Privacy</v-btn>
        </v-col>
        <v-col cols="12" md="4" class="copy-right">
          © 2024 CoPlaylist, Inc
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.bottom-footer {
  background-color: #1976D2;
  color: black;
  text-align: center;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 0.9rem;
}

.footer-link {
  color: black;
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
}

.copy-right {
  margin-top: 10px;
  font-size: 0.8rem;
  color: white;
}

@media (min-width: 768px) {
  .footer-links, .social-media-icons, .copy-right {
    margin-top: 0;
  }
}
</style>
