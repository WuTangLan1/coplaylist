<!-- src/components/homeDir/infoModal.vue -->
<script>
import { ref } from 'vue';
import AboutSection from './aboutSection.vue';
import TosSection from './tosSection.vue';
import PrivacySection from './privacySection.vue';
import PromptGuideSection from './promptguideSection.vue';

export default {
  props: ['currentComponent'],
  components: {
    AboutSection,
    TosSection,
    PrivacySection,
    PromptGuideSection
  },
  emits: ['closeModal', 'update:currentComponent'],
  setup(props, { emit }) {
    const dialog = ref(true);
    const components = [
      { name: 'About', component: 'AboutSection' },
      { name: 'ToS', component: 'TosSection' },
      { name: 'Privacy', component: 'PrivacySection' },
      { name: 'Guide', component: 'PromptGuideSection' }
    ];

    function closeModal() {
      dialog.value = false;
      emit('closeModal');
    }

    function changeComponent(componentName) {
      emit('update:currentComponent', componentName);
    }

    return {
      dialog,
      components,
      closeModal,
      changeComponent
    };
  }
};
</script>

<template>
  <v-dialog v-model="dialog" persistent max-width="700px">
    <v-card>
      <v-card-title class="d-flex align-center">
        <span class="headline">Information Center</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeModal" class="close-btn">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-tabs centered :model-value="currentComponent" @update:model-value="changeComponent">
        <v-tab v-for="item in components" :key="item.name" @click="changeComponent(item.component)">
          {{ item.name }}
        </v-tab>
      </v-tabs>

      <v-card-text>
        <component :is="currentComponent"></component>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.headline {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
}


.v-btn.icon {
  padding: 0;
}

.close-btn {
  background-color: #f44336;
  color: #ffffff;
  border-radius: 50%;
  min-width: 36px;
  min-height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-btn:hover {
  background-color: #d32f2f;
}
</style>
