<!-- src\components\authDir\account\userinfoSide.vue -->

<script>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  setup() {
    const authStore = useAuthStore();
    const fullName = ref(authStore.user.full_name || '');
    const musicTaste = ref(authStore.user.taste || '');
    const isFormValid = computed(() => fullName.value.trim() !== '' && musicTaste.value.trim() !== '');

    function updateUserProfile() {
      if (isFormValid.value) {
        authStore.updateUserProfile({ fullName: fullName.value, musicTaste: musicTaste.value });
        alert('Profile updated successfully!');
      } else {
        alert('Please fill in all fields.');
      }
    }

    return {
      fullName,
      musicTaste,
      updateUserProfile,
      isFormValid
    };
  }
};
</script>

<template>
    <div class="userinfo">
      <h2>User Profile</h2>
      <div>
        <label for="full-name">Full Name:</label>
        <input id="full-name" v-model="fullName" placeholder="Enter your full name" />
      </div>
      <div>
        <label for="music-taste">Music Taste:</label>
        <textarea id="music-taste" v-model="musicTaste" placeholder="Describe your music taste"></textarea>
      </div>
      <button :disabled="!isFormValid" @click="updateUserProfile">Update Profile</button>
    </div>
</template>
  
  <style scoped>
  .userinfo {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  input, textarea {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
  }
  button {
    padding: 8px;
    background-color: #507cac;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #406fa1;
  }
  </style>
  