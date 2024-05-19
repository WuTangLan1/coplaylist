<!-- src\components\authDir\register\infoContainer.vue -->
<template>
  <v-container class="form-container" max-width="500px">
    <v-card>
      <v-card-title>Personal Information</v-card-title>
      <v-card-subtitle>
        Please fill out the form below with your personal details to create your account.
      </v-card-subtitle>
      <v-card-text>
        <v-form @submit.prevent="validateInput">
          <v-text-field
            v-model="formData.firstName"
            :rules="[v => !!v || 'First name is required']"
            label="First Name"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="formData.lastName"
            :rules="[v => !!v || 'Last name is required']"
            label="Last/Middle Name"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="formData.email"
            :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
            label="Email"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="formData.phone"
            :rules="[v => !!v || 'Phone number is required', v => v.length >= 10 || 'Phone number must be at least 10 digits']"
            label="Phone Number"
            outlined
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-subtitle>
        Navigate through the pages below to complete your registration.
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'InfoContainer',
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      validationState: {
        firstName: false,
        lastName: false,
        email: false,
        phone: false
      }
    };
  },
  methods: {
    validateInput() {
      const validEmail = this.formData.email.includes('@') && this.formData.email.includes('.');
      const validPhone = this.formData.phone.length >= 10;
      const validFirstName = this.formData.firstName.trim() !== '';
      const validLastName = this.formData.lastName.trim() !== '';
      this.validationState.email = validEmail;
      this.validationState.phone = validPhone;
      this.validationState.firstName = validFirstName;
      this.validationState.lastName = validLastName;
      const fieldsFilled = validFirstName && validLastName && validEmail && validPhone;
      this.$emit('validation', fieldsFilled);
    }
  },
  watch: {
    'formData.firstName': 'validateInput',
    'formData.lastName': 'validateInput',
    'formData.email': 'validateInput',
    'formData.phone': 'validateInput'
  },
  created() {
    this.validateInput();
  }
};
</script>

<style scoped>
.form-container {
  margin: auto;
}
</style>
