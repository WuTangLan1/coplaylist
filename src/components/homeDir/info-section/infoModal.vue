<!-- src\components\homeDir\infoModal.vue -->

<script>
import AboutSection from './aboutSection.vue';
import TosSection from './tosSection.vue';
import PrivacySection from './privacySection.vue';
import PromptGuideSection from './promptguideSection.vue';

export default {
  components: {
    AboutSection,
    TosSection,
    PrivacySection,
    PromptGuideSection
  },
  data() {
    return {
      currentComponent: 'AboutSection',
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
      this.currentComponent = componentName;
    }
  }
};
</script>

<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal">
      <div class="modal-header">
        <div class="header-content">
          <img src="@/assets/images/header/info.png" alt="Info" class="info-icon"/>
          <h2 class="modal-title">Information Center</h2>
        </div>
        <button @click="closeModal" class="close-button">✕</button>
      </div>
      <div class="navigation">
        <button v-for="item in components" :key="item.component" @click="changeComponent(item.component)">
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
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 500;
  }
  
  .modal {
    background: white;
    padding: 1rem;
    border-radius: 10px;
    width: auto;
    max-width: 80%;
    max-height: 75vh;
    overflow: auto;
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

  .modal-body {
    overflow-y: auto;
    max-height: 54vh;
  }
  
  .modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  position: relative;
}

.header-content {
  display: flex;
  align-items: center;
}

.navigation {
  display: flex;
  justify-content: center;
  padding: 1rem;
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

.navigation button:hover {
  background-color: #345f8d;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  margin-left: 0.5rem; /* Adjust this as needed */
  color: #333;
}

  
  .info-icon {
    height: 60px; 
  }
  
  .close-button {
    position: absolute;
    top: 0px;
    right: 0px;
    background: none;
    border: none;
    font-size: 1.4rem;
    color: #507cac; 
    cursor: pointer;
    transition: color 0.2s ease-in-out;
  }
  
  .close-button:hover {
    color: #345f8d; 
  }
  </style>
  