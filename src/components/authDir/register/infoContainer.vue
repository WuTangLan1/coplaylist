<!-- src\components\authDir\register\infoContainer.vue -->
<script>
export default {
  name: 'InfoContainer',
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  methods: {
    validateInput() {
      const validEmail = this.formData.email.includes('@') && this.formData.email.includes('.');
      const validPhone = this.formData.phone.length >= 10; // Assuming a minimum length for phone numbers
      const fieldsFilled = this.formData.firstName && this.formData.lastName && this.formData.email && this.formData.phone;
      this.$emit('validation', validEmail && validPhone && fieldsFilled);
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


<template>
  <div class="form-container">
    <h2>Personal Information</h2>
    <p class="description">
      Please fill out the form below with your personal details to create your account. 
    </p>
    <form @submit.prevent="validateInput">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input id="firstName" v-model="formData.firstName" type="text" placeholder="Enter your first name" autofocus>
      </div>
      <div class="form-group">
        <label for="lastName">Last/Middle Name</label>
        <input id="lastName" v-model="formData.lastName" type="text" placeholder="Enter your last/middle name">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="formData.email" type="email" placeholder="Enter your email">
      </div>
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input id="phone" v-model="formData.phone" type="tel" placeholder="Enter your phone number" pattern="[0-9]{10}">
      </div>
    </form>
    <p class="description">
      Navigate through the pages below to complete your registration.
    </p>
  </div>
</template>

<style scoped>
.form-container {
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  width: 100%; 
  margin-bottom: 10px;
  display: flex; 
  flex-direction: column; 
  align-items: center; 
}

.description {
  margin-bottom: 10px;
  color: #666;
  text-align: center;
  max-width: 100%;
}

input {
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:focus {
  border-color: #6658d3;
  box-shadow: 0 0 8px rgba(102, 88, 211, 0.2);
}

label {
  width: 100%; 
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}
</style>