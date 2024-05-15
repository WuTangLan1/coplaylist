<!-- src/components/authDir/logSide.vue -->
<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AuthErrorModal from './authModals/autherrorModal.vue';

export default {
  name: 'LogSide',
  components: {
    FontAwesomeIcon,
    AuthErrorModal
  },
  emits: ['closeModal'],
  setup(_, { emit }) {
    const loginForm = ref({
      email: '',
      password: '',
    });

    const showPassword = ref(false);
    const showErrorModal = ref(false);
    const errorMessage = ref('');

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
        // Ensure the error is not logged to the console
        errorMessage.value = error.message;
        showErrorModal.value = true;
      }
    };

    const closeErrorModal = () => {
      showErrorModal.value = false;
    };

    return {
      loginForm,
      login,
      showPassword,
      toggleShowPassword,
      faEye,
      faEyeSlash,
      showErrorModal,
      errorMessage,
      closeErrorModal
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
            <font-awesome-icon :icon="showPassword ? faEyeSlash : faEye" />
          </span>
        </div>
      </div>
      <div class="btn-grp">
        <button type="submit" class="submit-button">Login</button>
      </div>
    </form>
    <AuthErrorModal :show="showErrorModal" :errorMessage="errorMessage" @close="closeErrorModal" />
  </div>
</template>


<style scoped>
.login-container {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  background: #ffffff;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  width: 100%;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

h2 {
  color: #333;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
}

input {
  padding: 12px;
  width: 92%;
  font-size: 1rem; 
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9; 
}

input:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.2);
}

label {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
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
  justify-content: flex-end; /* Aligns the button to the right */
  width: 100%;
}

.submit-button {
  padding: 12px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px; 
  transition: background-color 0.3s;
  font-size: 1rem;
}

.submit-button:hover, .submit-button:focus {
  background-color: #45a049;
}
</style>
