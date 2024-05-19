<!-- src\components\authDir\register\settingsContainer.vue -->
<script>
export default {
  name: 'SettingsContainer',
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      validationState: {
        password: false,
        confirmPassword: false,
        country: false
      }
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
      const passwordsMatch = this.formData.password === this.formData.confirmPassword;
      const passwordLength = this.formData.password.length >= 8;
      const countryFilled = this.formData.country.trim() !== '';
      this.validationState.password = passwordLength;
      this.validationState.confirmPassword = passwordsMatch && passwordLength;
      this.validationState.country = countryFilled;
      const isValid = this.validationState.password && this.validationState.confirmPassword && this.validationState.country;
      this.$emit('validation', isValid);
    }
  },
  watch: {
    'formData.password': 'validatePassword',
    'formData.confirmPassword': 'validatePassword',
    'formData.country': 'validatePassword'
  },
  mounted() {
    this.validatePassword();
  }
};
</script>

<template>
  <v-container class="settings-container" max-width="500px">
    <v-card>
      <v-card-title>Account Settings</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="validatePassword" class="settings-form">
          <v-text-field
            v-model="formData.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="togglePasswordVisibility"
            :rules="[v => !!v || 'Password is required', v => v.length >= 8 || 'Password must be at least 8 characters']"
            label="Password"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="formData.confirmPassword"
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showConfirmPassword ? 'text' : 'password'"
            @click:append="toggleConfirmPasswordVisibility"
            :rules="[v => !!v || 'Confirmation is required', v => v === formData.password || 'Passwords must match']"
            label="Confirm Password"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="formData.country"
            :rules="[v => !!v || 'Country is required']"
            label="Country of Origin"
            outlined
          ></v-text-field>
        </v-form>
        <v-card-subtitle>
          Your selected country of origin will influence your song suggestions and currency format.
        </v-card-subtitle>
      </v-card-text>
    </v-card>
  </v-container>
</template>



<style scoped>
.settings-container {
  margin: auto;
  text-align: center;
}
</style>
