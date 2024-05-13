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
    <div class="form-group">
      <label for="first-name">First Name:</label>
      <input id="first-name" v-model="firstName" placeholder="Enter your first name" />
    </div>
    <div class="form-group">
      <label for="last-name">Last Name:</label>
      <input id="last-name" v-model="lastName" placeholder="Enter your last name" />
    </div>
    <div class="form-group">
      <label for="phone">Phone:</label>
      <input id="phone" v-model="phone" placeholder="Enter your phone number" />
    </div>
    <div class="form-group">
      <label for="country">Country:</label>
      <input id="country" v-model="country" placeholder="Enter your country" />
    </div>
    <div class="form-group">
      <label>Favourite Artists:</label>
      <div v-for="(artist, index) in favouriteArtists" :key="index" class="artist-group">
        <input v-model="favouriteArtists[index]" placeholder="Enter an artist" />
        <button @click="removeFavouriteArtist(index)" class="remove-button">Remove</button>
      </div>
      <button @click="addFavouriteArtist" class="add-button">Add Favourite Artist</button>
    </div>
    <div class="form-group">
      <label>Disliked Artists:</label>
      <div v-for="(artist, index) in dislikedArtists" :key="index" class="artist-group">
        <input v-model="dislikedArtists[index]" placeholder="Enter an artist" />
        <button @click="removeDislikedArtist(index)" class="remove-button">Remove</button>
      </div>
      <button @click="addDislikedArtist" class="add-button">Add Disliked Artist</button>
    </div>
    <button :class="{ 'update-successful': isUpdatedSuccessfully }" :disabled="!isFormValid" @click="updateUserProfile" class="update-button">Update Profile</button>
  </div>
</template>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 0.3rem;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

label {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-align: left;
}

input, textarea {
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.artist-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #507cac;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #406fa1;
}

.remove-button {
  background-color: #d9534f;
}

.remove-button:hover {
  background-color: #c9302c;
}

.add-button {
  margin-top: 10px;
  background-color: #5cb85c;
}

.add-button:hover {
  background-color: #4cae4c;
}

.update-button {
  align-self: center;
  background-color: #5bc0de;
}

.update-button:hover {
  background-color: #46b8da;
}

.update-successful {
  animation: glow 1s ease-in-out 3;
}

@keyframes glow {
  0%, 100% { box-shadow: none; }
  50% { box-shadow: 0 0 8px 2px #28a745; }
}
</style>

