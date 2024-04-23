<!-- src\components\auth\regSide.vue -->
<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  name: 'RegSide',
  setup() {
    const form = ref({
      email: '',
      fullName: '',
      username: '',
      password: '',
      confirmPassword: '',
      musicTaste: ''
    });

    const authStore = useAuthStore();

    const register = async () => {
      if (form.value.password !== form.value.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        await authStore.registerUser(form.value);
      } catch (error) {
        console.error(error);
      }
    };

    return {
      form,
      register
    };
  }
};
</script>

<template>
  <div class="registration-container">
    <form @submit.prevent="register" class="registration-form">
      <h2>Registration</h2>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model.trim="form.email" required placeholder="Enter your email">
      </div>
      <div class="form-group">
        <label for="fullName">Full Name</label>
        <input type="text" id="fullName" v-model.trim="form.fullName" required placeholder="Enter your full name">
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model.trim="form.username" required placeholder="Choose a username">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" required minlength="6" placeholder="Enter a password">
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="form.confirmPassword" required minlength="6" placeholder="Confirm your password">
      </div>
      <div class="form-group">
          <label for="musicTaste">Music Taste</label>
          <textarea id="musicTaste" v-model="form.musicTaste" required 
                    placeholder="Describe your music taste to us. What phase are you in ?" rows="6" class="music-taste-textarea"></textarea>
        </div>
      <div class="btn-grp">
        <button type="submit" class="submit-button">Register</button>
      </div>
    </form>
  </div>
</template>

    
  <style scoped>
  .registration-container {
    background: #e1e8eb;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    margin-top: 0.5rem;
  }
  
  .registration-form h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
  }
  .music-taste-textarea {
    width: 100%; 
    padding: 0.2rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
    min-height: 120px; 
    resize: vertical; 
    box-sizing: border-box; 
  }
  
  .form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 10px;
    color: #666;
  }
  
  .form-group input {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
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
    width:50%;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    margin-top: 10px;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover, .submit-button:focus {
    background-color: #4cae4c;
  }
  
  h2 {
      text-align: center;
      margin-bottom: 20px;
    }

@media (min-width: 600px) {
  .registration-form {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Creates two columns of equal width */
    grid-gap: 20px; /* Adds some space between the columns */
  }

  /* Center the Registration heading above both columns */
  .registration-form h2 {
    grid-column: 1 / -1; /* Ensures the heading spans both columns */
    justify-self: center; /* Centers the heading */
  }

  /* Set the form groups to take one column each */
  .registration-form .form-group {
    grid-column: span 1;
  }

  /* Make sure the music taste textarea and button group span both columns */
  .music-taste-textarea,
  .btn-grp {
    grid-column: 1 / -1;
  }

  /* Adjust the button group to center the button */
  .btn-grp {
    justify-content: center;
  }
  
  /* Additional styles for better alignment and spacing */
  .form-group label {
    align-self: start;
    padding-top: 0.5rem; /* Adjust to align labels with inputs */
  }
  
  .form-group input,
  .music-taste-textarea {
    width: 100%; /* Full width of the grid column */
  }

  .submit-button {
    width: auto; /* Allows the button to size according to its padding and content */
    justify-self: center; /* Center the button within its grid area */
  }
}

  </style>
  
    