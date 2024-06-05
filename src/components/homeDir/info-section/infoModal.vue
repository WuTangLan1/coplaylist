<!-- src\components\homeDir\infoModal.vue -->
<script>
import AboutSection from './aboutSection.vue';
import TosSection from './tosSection.vue';
import PrivacySection from './privacySection.vue';
import PromptGuideSection from './promptguideSection.vue';
import ErrorSide from './logError/errorSide.vue';

export default {
  props: ['currentComponent'],
  components: {
    AboutSection,
    TosSection,
    PrivacySection,
    PromptGuideSection,
    ErrorSide
  },
  emits: ['closeModal', 'update:currentComponent'],
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
  data() {
    return {
      showErrorModal: false,
    }
  },
  methods: {
       closeModal() {
          this.$emit('closeModal');
          document.body.style.overflow = 'auto'; 
        },
        changeComponent(componentName) {
          this.$emit('update:currentComponent', componentName);  
        },
        openModal() {
          document.body.style.overflow = 'hidden'; 
        },
        openErrorModal() {
          this.showErrorModal = true;  
          document.body.style.overflow = 'hidden';
        }
  }
};
</script>

<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal">
      <div class="modal-header">
        <v-icon class="info-icon" right>mdi-information-outline</v-icon>
        <h2 class="modal-title">Info Center</h2>
        <v-btn icon @click="closeModal" class="close-btn">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="navigation">
        <button v-for="item in components" :key="item.name" @click="changeComponent(item.component)" :class="{ active: currentComponent === item.component }">
          {{ item.name }}
        </button>
      </div>
      <div class="modal-body">
        <component :is="currentComponent" @openErrorSide="openErrorModal"></component>
      </div>
    </div>
  </div>
  <div class="modal-backdrop" v-if="showErrorModal" @click.self="closeModal">
      <error-side @closeErrorSide="closeModal"></error-side>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); 
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
  overflow: hidden; 
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%; 
  max-width: 700px;
  max-height: 75vh;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  position: relative; 
}

@keyframes dropAnimation {
  from {
    opacity: 0;
    transform: translateY(-50px); 
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .modal {
    width: 95%;
    margin-top: 50px;
    margin-bottom: 50px; 
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

.modal-body {
  padding: 0.5rem;
  width: 100%;
  overflow-y: auto;
  max-height: 50vh;
}

.modal-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
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

.info-icon {
  color: #507cac; 
  margin-left: 10px; 
  cursor: pointer; 
  min-width: 26px;
  min-height: 26px;
  max-width: 32px;
  max-height: 32px;
}

</style>