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

    const showPassword = ref(false);

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
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-top: 0.3rem;
  max-width: 550px;
  max-height: 75vh;
  overflow-y: auto;
  background: #e1e8eb;
  margin: auto;
  transition: background-color 0.3s;
  align-items: center;
  align-content: center;
}

.login-form {
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

h2 {
  color: #333;
  text-align: center;
  font-weight: bold;
}

input {
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f7f9fc; 
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

.input-group {
  position: relative;
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
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  width: 90%;
  border-radius: 5px; 
  transition: background-color 0.3s;
}

.submit-button:hover, .submit-button:focus {
  background-color: #311e86;
}

.description {
  margin-bottom: 10px;
  color: #666;
  text-align: center;
  max-width: 100%;
}
</style>
