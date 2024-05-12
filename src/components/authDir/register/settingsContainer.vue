<!-- src\components\authDir\register\settingsContainer.vue -->
<script>
export default {
  name: 'SettingsContainer',
  data() {
    return {
      password: '',
      confirmPassword: '',
      country: ''
    };
  },
  methods: {
    validatePassword() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return false;
      }
      return true;
    }
  }
};
</script>

<template>
  <div>
    <h2>Settings</h2>
    <form @submit.prevent="validatePassword">
      <input v-model="password" type="password" placeholder="Password" required>
      <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required>
      <input v-model="country" placeholder="Country of Origin">
    </form>
  </div>
</template>

<style scoped>
input, button {
    display: block;
    margin-top: 10px;
    padding: 8px;
    width: 90%;
}
</style>
