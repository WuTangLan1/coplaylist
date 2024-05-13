<!-- src\components\authDir\account\userinfoSide.vue -->
<script>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  setup() {
    const authStore = useAuthStore();

    const firstName = ref(authStore.user.first_name || '');
    const lastName = ref(authStore.user.last_name || '');
    const phone = ref(authStore.user.phone || '');
    const country = ref(authStore.user.country || '');
    const favouriteArtists = ref(authStore.user.favourite_artists || []);
    const dislikedArtists = ref(authStore.user.disliked_artists || []);

    const isFormValid = computed(() => 
      firstName.value.trim() !== '' && 
      lastName.value.trim() !== '' && 
      phone.value.trim() !== '' &&
      country.value.trim() !== ''
    );

    const isUpdatedSuccessfully = ref(false);

    const updateUserProfile = async () => {
      if (isFormValid.value) {
        try {
          await authStore.updateUserProfile({ 
            first_name: firstName.value,
            last_name: lastName.value,
            phone: phone.value,
            country: country.value,
            favourite_artists: favouriteArtists.value,
            disliked_artists: dislikedArtists.value
          });
          isUpdatedSuccessfully.value = true;
          setTimeout(() => isUpdatedSuccessfully.value = false, 3000);
        } catch (error) {
          alert('Failed to update profile: ' + error.message);
        }
      } else {
        alert('Please fill in all fields.');
      }
    };

    const addFavouriteArtist = () => {
      favouriteArtists.value.push('');
    };

    const removeFavouriteArtist = (index) => {
      favouriteArtists.value.splice(index, 1);
    };

    const addDislikedArtist = () => {
      dislikedArtists.value.push('');
    };

    const removeDislikedArtist = (index) => {
      dislikedArtists.value.splice(index, 1);
    };

    return {
      firstName,
      lastName,
      phone,
      country,
      favouriteArtists,
      dislikedArtists,
      updateUserProfile,
      isFormValid,
      isUpdatedSuccessfully,
      addFavouriteArtist,
      removeFavouriteArtist,
      addDislikedArtist,
      removeDislikedArtist
    };
  }
};
</script>

<template>
  <div class="userinfo">
    <h2>User Profile</h2>
    <div>
      <label for="first-name">First Name:</label>
      <input id="first-name" v-model="firstName" placeholder="Enter your first name" />
    </div>
    <div>
      <label for="last-name">Last Name:</label>
      <input id="last-name" v-model="lastName" placeholder="Enter your last name" />
    </div>
    <div>
      <label for="phone">Phone:</label>
      <input id="phone" v-model="phone" placeholder="Enter your phone number" />
    </div>
    <div>
      <label for="country">Country:</label>
      <input id="country" v-model="country" placeholder="Enter your country" />
    </div>
    <div>
      <label>Favourite Artists:</label>
      <div v-for="(artist, index) in favouriteArtists" :key="index">
        <input v-model="favouriteArtists[index]" placeholder="Enter an artist" />
        <button @click="removeFavouriteArtist(index)">Remove</button>
      </div>
      <button @click="addFavouriteArtist">Add Favourite Artist</button>
    </div>
    <div>
      <label>Disliked Artists:</label>
      <div v-for="(artist, index) in dislikedArtists" :key="index">
        <input v-model="dislikedArtists[index]" placeholder="Enter an artist" />
        <button @click="removeDislikedArtist(index)">Remove</button>
      </div>
      <button @click="addDislikedArtist">Add Disliked Artist</button>
    </div>
    <button :class="{ 'update-successful': isUpdatedSuccessfully }" :disabled="!isFormValid" @click="updateUserProfile">Update Profile</button>
  </div>
</template>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input, textarea {
  width: 95%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #507cac;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 5px;
}

button:hover {
  background-color: #406fa1;
}

.update-successful {
  animation: glow 1s ease-in-out 3;
}

@keyframes glow {
  0%, 100% { box-shadow: none; }
  50% { box-shadow: 0 0 8px 2px #28a745; }
}
</style>
