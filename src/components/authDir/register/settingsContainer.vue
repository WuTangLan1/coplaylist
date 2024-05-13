<!-- src\components\authDir\register\settingsContainer.vue -->
<script>
export default {
  name: 'SettingsContainer',
  data() {
    return {
      password: '',
      confirmPassword: '',
      country: '',
      showPassword: false,
      showConfirmPassword: false
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    validatePassword() {
      const isValid = this.password === this.confirmPassword && this.password.length > 0 && this.country.length > 0;
      this.$emit('validation', isValid);
      return isValid;
    }
  },
  watch: {
    password() {
      this.validatePassword();
    },
    confirmPassword() {
      this.validatePassword();
    },
    country() {
      this.validatePassword();
    }
  },
  created() {
    this.validatePassword(); 
  }
};
</script>


<template>
  <div class="settings-container">
    <h2>Account Settings</h2>
    <p class="description">
      Be sure to set a strong and secure password for your account
    </p>
    <form @submit.prevent="validatePassword" class="settings-form">
      <div class="input-group">
        <label for="password">Password</label>
        <div class="input-with-icon">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" required>
          <span @click="togglePasswordVisibility" class="visibility-toggle">
            <font-awesome-icon :icon="showPassword ? 'far fa-eye-slash' : 'far fa-eye'" />
          </span>
        </div>
      </div>
      <div class="input-group">
        <label for="passwordConfirm">Confirm password</label>
        <div class="input-with-icon">
          <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="Confirm Password" required>
          <span @click="toggleConfirmPasswordVisibility" class="visibility-toggle">
            <font-awesome-icon :icon="showConfirmPassword ? 'far fa-eye-slash' : 'far fa-eye'" />
          </span>
        </div>
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
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  background-color: #f4f4f9;
  padding: 20px;
  border-radius: 8px;
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
max-width: 500px;
margin: auto;
text-align: center;
}

.settings-form {
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
}

.input-group {
width: 100%;
margin-bottom: 20px;
display: flex;
flex-direction: column;
align-items: center;
}

.input-with-icon {
position: relative;
display: flex;
align-items: center;
width: 80%;
}

input {
flex: 1;
padding: 8px;
border: 1px solid #ccc;
border-radius: 4px;
}

input:focus {
border-color: #6658d3;
box-shadow: 0 0 8px rgba(102, 88, 211, 0.3);
}

.visibility-toggle {
margin-left: -30px;
cursor: pointer;
z-index: 5;
}

.description {
margin-bottom: 10px;
color: #666;
text-align: center;
max-width: 100%;
}

label {
width: 80%;
margin-bottom: 5px;
font-weight: bold;
color: #333;
text-align: left;
}

h2 {
margin-bottom: 20px;
color: #333;
}
</style>