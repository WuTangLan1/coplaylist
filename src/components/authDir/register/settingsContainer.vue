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
      alert("Password confirmed!");
      return true;
    }
  }
};
</script>

<template>
  <div class="settings-container">
    <h2>Account Settings</h2>
    <form @submit.prevent="validatePassword" class="settings-form">
      <div class="input-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" placeholder="Password" required>
      </div>
      <div class="input-group">
        <label for="passwordConfirm">Confirm password</label>
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required>
      </div>
      <div class="input-group">
        <label for="countryofOrigin">Country of origin</label>
        <input v-model="country" placeholder="Country of Origin">
      </div>
    </form>
  </div>
</template>

<style scoped>
.settings-container {
  background-color: #f4f4f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
  text-align: center;
}

.settings-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  align-content: center;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.input-group {
  width: 100%;
  margin-bottom: 20px;
  align-items: center;
  align-self: center;
  align-content: center;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: #6658d3;
  box-shadow: 0 0 8px rgba(102, 88, 211, 0.3);
}

h2 {
  margin-bottom: 20px;
  color: #333;
}
</style>
