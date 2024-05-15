<!-- src/components/authDir/authModals/forgotpasswordModal.vue -->
<script>
import { ref } from 'vue';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default {
  name: 'ForgotPasswordModal',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  setup(_, { emit }) {
    const email = ref('');
    const successMessage = ref('');
    const errorMessage = ref('');

    const resetPassword = async () => {
      const auth = getAuth();
      try {
        await sendPasswordResetEmail(auth, email.value);
        successMessage.value = 'Password reset email sent. Please check your inbox.';
        errorMessage.value = '';
      } catch (error) {
        successMessage.value = '';
        errorMessage.value = 'Failed to send password reset email. Please try again.';
      }
    };

    const closeModal = () => {
      emit('close');
    };

    return {
      email,
      successMessage,
      errorMessage,
      resetPassword,
      closeModal
    };
  }
};
</script>

<template>
  <div v-if="show" class="modal-backdrop">
    <div class="modal">
      <button class="close-button" @click="closeModal">✕</button>
      <h2>Reset Password</h2>
      <div class="form-group">
        <label for="resetEmail">Email</label>
        <input type="email" id="resetEmail" v-model.trim="email" required placeholder="Enter your email">
      </div>
      <div class="btn-grp">
        <button @click="resetPassword" class="submit-button">Send Reset Password Email</button>
      </div>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.close-button {
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;
}

.close-button:hover {
  color: #ff5a5a;
}

h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

input {
  padding: 12px;
  width: 90%;
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

.btn-grp {
  display: flex;
  justify-content: center; /* Center-aligns the button */
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

.success-message {
  color: green;
  margin-top: 20px;
}

.error-message {
  color: red;
  margin-top: 20px;
}
</style>
