<!-- src\components\homeDir\infoModal.vue -->
<script>
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
  data() {
    return {
      components: [
        { name: 'About', component: 'AboutSection' },
        { name: 'ToS', component: 'TosSection' },
        { name: 'Privacy', component: 'PrivacySection' },
        { name: 'Guide', component: 'PromptGuideSection' }
      ]
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    changeComponent(componentName) {
      this.$emit('update:currentComponent', componentName);  
    }
  }
};
</script>

<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">Information Center</h2>
        <font-awesome-icon icon="times" class="close-icon" @click="closeModal" />
      </div>
      <div class="navigation">
        <button v-for="item in components" :key="item.name" @click="changeComponent(item.component)" :class="{ active: currentComponent === item.component }">
          {{ item.name }}
        </button>
      </div>
      <div class="modal-body">
        <component :is="currentComponent"></component>
      </div>
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
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
}

.modal {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  width: 80%;
  max-width: 700px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  animation: dropAnimation 0.5s ease-in-out forwards;
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

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f3f3f4;
  border-radius: 10px 10px 0 0;
}

.modal-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.close-icon {
  font-size: 1.5rem;
  cursor: pointer;
}

.navigation {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: #f7f7f8;
  border-bottom: 1px solid #ddd;
}

.navigation button {
  margin: 0 10px;
  padding: 0.5rem 1rem;
  background-color: #507cac;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.navigation button.active {
  background-color: #345f8d;
}

.navigation button:hover {
  background-color: #345f8d;
}

.modal-body {
  padding: 1rem;
  overflow-y: auto;
  max-height: calc(80vh - 150px);
}

.info-icon {
  height: 60px; 
}
</style>
