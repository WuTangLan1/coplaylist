<!-- src/components/authDir/logSide.vue -->
<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AuthErrorModal from './authModals/autherrorModal.vue';
import ForgotPasswordModal from './authModals/forgotpasswordModal.vue';

export default {
  name: 'LogSide',
  components: {
    FontAwesomeIcon,
    AuthErrorModal,
    ForgotPasswordModal
  },
  emits: ['closeModal'],
  setup(_, { emit }) {
    const loginForm = ref({
      email: '',
      password: '',
    });

    const showPassword = ref(false);
    const showErrorModal = ref(false);
    const showForgotPasswordModal = ref(false);
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
        errorMessage.value = error.message;
        showErrorModal.value = true;
      }
    };

    const closeErrorModal = () => {
      showErrorModal.value = false;
    };

    const openForgotPasswordModal = () => {
      showForgotPasswordModal.value = true;
    };

    const closeForgotPasswordModal = () => {
      showForgotPasswordModal.value = false;
    };

    return {
      loginForm,
      login,
      showPassword,
      toggleShowPassword,
      faEye,
      faEyeSlash,
      showErrorModal,
      showForgotPasswordModal,
      errorMessage,
      closeErrorModal,
      openForgotPasswordModal,
      closeForgotPasswordModal
    };
  },
};
</script>

<template>
  <v-container class="login-container">
    <v-form @submit.prevent="login" class="login-form">
      <h2>Login</h2>
      <v-text-field
        v-model.trim="loginForm.email"
        label="Email"
        type="email"
        required
        placeholder="Enter your email"
        outlined
        dense
        class="login-input"
      ></v-text-field>
      <v-text-field
        v-model="loginForm.password"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        required
        minlength="6"
        placeholder="Enter your password"
        outlined
        dense
        class="login-input"
        append-inner-icon
        @click:append-inner="toggleShowPassword"
      >
        <template v-slot:append>
          <v-icon @click="toggleShowPassword">
            <font-awesome-icon :icon="showPassword ? faEyeSlash : faEye" />
          </v-icon>
        </template>
      </v-text-field>
      <v-row class="forgot-password" @click="openForgotPasswordModal">Forgot Password?</v-row>
      <v-btn type="submit" class="submit-button" color="primary">Login</v-btn>
    </v-form>
    <AuthErrorModal :show="showErrorModal" :errorMessage="errorMessage" @close="closeErrorModal" />
    <ForgotPasswordModal :show="showForgotPasswordModal" @close="closeForgotPasswordModal" />
  </v-container>
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

.login-input {
  width: 100%;
  margin-bottom: 20px;
}

h2 {
  color: #333;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
}

.forgot-password {
  cursor: pointer;
  color: #4CAF50;
  margin-bottom: 10px;
  text-align: center;
}

.forgot-password:hover {
  text-decoration: underline;
}

.submit-button {
  margin-top: 20px;
  width: 100%;
}
</style>
