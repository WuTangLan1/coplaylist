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
      // Validation logic here
    }
  }
};
</script>

<template>
    <div>
      <h2>Personal Information</h2>
      <form @submit.prevent="validateInput">
        <label for="firstName">First Name</label>
        <input id="firstName" v-model="firstName" placeholder="First Name">
        <label for="lastName">Last/Middle Name</label>
        <input id="lastName" v-model="lastName" placeholder="Last/Middle Name">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" placeholder="Email">
        <label for="phone">Phone Number</label>
        <input id="phone" v-model="phone" type="tel" placeholder="Phone Number">
      </form>
    </div>
  </template>
  
  <style scoped>
  input, label {
    display: block;
    margin: 10px 0;
    padding: 8px;
    width: 90%;
  }
  label {
    font-weight: bold;
  }
  </style>
  