<!-- src\components\auth\regSide.vue -->
<script>
import InfoContainer from './register/infoContainer.vue';
import SettingsContainer from './register/settingsContainer.vue';
import PreferencesContainer from './register/preferencesContainer.vue';

export default {
  name: 'RegSide',
  components: {
    InfoContainer,
    SettingsContainer,
    PreferencesContainer
  },
  data() {
    return {
      currentStep: 1,
      isInfoValid: false,
      isSettingsValid: false,
      isPreferencesValid: false
    };
  },
  computed: {
    componentMap() {
      return {
        1: 'InfoContainer',
        2: 'SettingsContainer',
        3: 'PreferencesContainer'
      };
    },
    isFormValid() {
      return this.isInfoValid && this.isSettingsValid && this.isPreferencesValid;
    }
  },
  methods: {
    navigate(step) {
      this.currentStep = step;
    },
    updateValidity(status, step) { 
      if (step === 1) {
        this.isInfoValid = status;
      } else if (step === 2) {
        this.isSettingsValid = status;
      } else if (step === 3) {
        this.isPreferencesValid = status;
      }
    }

  }
};
</script>

<template>
  <div class="registration-container">
    <component :is="componentMap[currentStep]"
               @validation="updateValidity($event, currentStep)">
    </component>
    <div class="navigation-dots">
      <span v-for="dot in [1, 2, 3]" :key="dot"
            :class="{ active: currentStep === dot }"
            @click="navigate(dot)"></span>
    </div>
    <button :disabled="!isFormValid" class="reg-btn">Register</button>
  </div>
</template>

<style scoped>
.registration-container {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-top: 0.3rem;
  max-width: 550px;
  min-height: 550px;
  max-height: 75vh;
  overflow-y: auto;
  background: #e1e8eb;
  margin: auto;
  transition: background-color 0.3s;
  align-items: center;
  align-content: center;

}

.navigation-dots {
  align-items: center;
  align-self: center;
  text-align: center;
  align-content: center;
  margin-top: 2rem;
}

.navigation-dots span {
  height: 10px;
  width: 10px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin: 0 5px;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;
}
.navigation-dots .active {
  background-color: #7e1b76;
  transform: scale(1.5);
}

.reg-btn:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed; 
}

.reg-btn {
  display: block;
  margin: 20px auto;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  width: 90%;
  height: 40px;
  border-radius: 5px; 
}
</style>
