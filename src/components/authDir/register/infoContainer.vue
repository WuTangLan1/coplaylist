<!-- src\components\authDir\register\infoContainer.vue -->

<script>
export default {
  name: 'InfoContainer',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };
  },
  methods: {
    validateInput() {
      // Here, you could add more advanced validation if necessary
      if (!this.email.includes('@')) {
        alert('Please enter a valid email address.');
        return false;
      }
      if (this.phone.length < 10) {
        alert('Please enter a valid phone number.');
        return false;
      }
      alert('Form is valid!');
    }
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
        <input id="firstName" v-model="firstName" type="text" placeholder="Enter your first name" autofocus>
      </div>
      <div class="form-group">
        <label for="lastName">Last/Middle Name</label>
        <input id="lastName" v-model="lastName" type="text" placeholder="Enter your last/middle name">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" placeholder="Enter your email">
      </div>
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input id="phone" v-model="phone" type="tel" placeholder="Enter your phone number" pattern="[0-9]{10}">
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