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
  }
};
</script>

<template>
  <div>
    <h2>Personal Information</h2>
    <form>
      <input v-model="firstName" placeholder="First Name">
      <input v-model="lastName" placeholder="Last/Middle Name">
      <input v-model="email" type="email" placeholder="Email">
      <input v-model="phone" type="tel" placeholder="Phone Number">
    </form>
  </div>
</template>

<style scoped>
input {
    display: block;
    margin: 10px 0;
    padding: 8px;
    width: 100%;
}
</style>
