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
      showPassword.value = !showPassword.value; // Toggle true/false
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
  background: #e1e8eb;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  max-height: 70vh;
  margin-top: 0.5rem;
}

.login-form h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  color: #666;
}

.input-group {
  position: relative;
  display: flex;
}

.form-group input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
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
  justify-content: flex-end;
  margin-top: 10px;
}

.submit-button {
  padding: 0.5rem;
  background-color: #5c90b8;
  color: white;
  border: none;
  width: 50%;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 10px;
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
