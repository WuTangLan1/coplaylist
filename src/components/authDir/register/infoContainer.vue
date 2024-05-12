<!-- src\components\authDir\register\infoContainer.vue -->

<script>
import VueTelInput from 'vue-tel-input';
export default {
  name: 'InfoContainer',
  components: {
    VueTelInput
  },
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
      // Implement validation logic here
      // You can also access phone number details via this.phone
    }
  }
};
</script>

<template>
    <div class="form-container">
      <h2>Personal Information</h2>
      <form @submit.prevent="validateInput">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input id="firstName" v-model="firstName" placeholder="Enter your first name" autofocus>
        </div>
        <div class="form-group">
          <label for="lastName">Last/Middle Name</label>
          <input id="lastName" v-model="lastName" placeholder="Enter your last/middle name">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" placeholder="Enter your email">
        </div>
        <div class="form-group">
        <label for="phone">Phone Number</label>
        <vue-tel-input v-model="phone" :required="true"></vue-tel-input>
      </div>
    </form>
  </div>
</template>

  
  <style scoped>
.form-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 20px;
}
input, .vue-tel-input {
  width: 90%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
input:focus, .vue-tel-input input:focus {
  border-color: #6658d3;
  box-shadow: 0 0 8px rgba(102, 88, 211, 0.2);
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}
</style>