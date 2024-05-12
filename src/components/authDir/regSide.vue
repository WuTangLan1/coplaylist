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
      currentStep: 1
    };
  },
  computed: {
    componentMap() {
      return {
        1: 'InfoContainer',
        2: 'SettingsContainer',
        3: 'PreferencesContainer'
      };
    }
  },
  methods: {
    navigate(step) {
      this.currentStep = step;
    }
  }
};
</script>

<template>
  <div class="registration-container">
    <component :is="componentMap[currentStep]"></component>
    <div class="navigation-dots">
      <span v-for="dot in [1, 2, 3]" :key="dot"
            :class="{ active: currentStep === dot }"
            @click="navigate(dot)"></span>
    </div>
  </div>
</template>

<style scoped>
.registration-container {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-top: 0.3rem;
  max-width: 550px;
  max-height: 75vh;
  background: #e1e8eb;
  overflow-y: auto;
  margin: auto;
  transition: background-color 0.3s;
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
</style>
