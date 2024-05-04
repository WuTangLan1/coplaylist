<!-- src/components/authDir/logSide.vue -->
<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  name: 'LogSide',
  setup(_, { emit }) {
    const loginForm = ref({
      email: '',
      password: '',
    });

    // State for toggling password visibility
    const showPassword = ref(false);

    // Toggle visibility function
    const toggleShowPassword = () => {
      showPassword.value = !showPassword.value;
    };

    const authStore = useAuthStore();

    const login = async () => {
      try {
        await authStore.loginUser({
          username: loginForm.value.email,
          password: loginForm.value.password,
        });
        loginForm.value = { email: '', password: '' };
        emit('closeModal');
      } catch (error) {
        console.error(error);
      }
    };

    return {
      loginForm,
      login,
      showPassword,
      toggleShowPassword,
    };
  },
};
</script>

<template>
  <div class="login-container">
    <form @submit.prevent="login" class="login-form">
      <h2>Login</h2>
      <div class="form-group">
        <label for="loginEmail">Email</label>
        <input type="email" id="loginEmail" v-model.trim="loginForm.email" required placeholder="Enter your email">
      </div>
      <div class="form-group">
        <label for="loginPassword">Password</label>
        <div class="input-group">
          <input :type="showPassword ? 'text' : 'password'" id="loginPassword" v-model="loginForm.password" required minlength="6"
            placeholder="Enter your password">
          <span class="toggle-visibility" @click="toggleShowPassword">
            <font-awesome-icon :icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" />
          </span>
        </div>
      </div>
      <div class="btn-grp">
        <button type="submit" class="submit-button">Login</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  background: #ffffff; 
  padding: 0.3rem;
  border-radius: 15px; 
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15); 
  width: 90%;
  max-width: 500px; 
  margin: 20px auto;
  border: 1px solid #e1e8eb;
}

.login-form h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #666;
}

.input-group {
  position: relative;
  display: flex;
}

.form-group input {
  padding: 10px;
  border-radius: 8px; 
  max-width: 93%;
  border: 1px solid #ddd;
  font-size: 16px;
  background-color: #f7f9fc; /* Lighter background for inputs */
  width: 100%;
}

.toggle-visibility {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.btn-grp {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.submit-button {
  padding: 0.7rem 2rem;
  background-color: #5c90b8;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

.submit-button:hover, .submit-button:focus {
  background-color: #311e86;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>

