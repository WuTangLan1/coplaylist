<!-- src\components\authDir\account\userinfoSide.vue -->
<script>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  setup() {
    const authStore = useAuthStore();

    const initialFirstName = ref(authStore.user.first_name || '');
    const initialLastName = ref(authStore.user.last_name || '');
    const initialPhone = ref(authStore.user.phone || '');
    const initialCountry = ref(authStore.user.country || '');
    const initialFavouriteArtists = ref([...authStore.user.favourite_artists] || []);
    const initialDislikedArtists = ref([...authStore.user.disliked_artists] || []);

    const firstName = ref(initialFirstName.value);
    const lastName = ref(initialLastName.value);
    const phone = ref(initialPhone.value);
    const country = ref(initialCountry.value);
    const favouriteArtists = ref([...initialFavouriteArtists.value]);
    const dislikedArtists = ref([...initialDislikedArtists.value]);

    const isFormValid = computed(() => 
      firstName.value.trim() !== '' && 
      lastName.value.trim() !== '' && 
      phone.value.trim() !== '' &&
      country.value.trim() !== ''
    );

    const isUpdatedSuccessfully = ref(false);

    const isFormChanged = computed(() => {
      return (
        firstName.value !== initialFirstName.value ||
        lastName.value !== initialLastName.value ||
        phone.value !== initialPhone.value ||
        country.value !== initialCountry.value ||
        JSON.stringify(favouriteArtists.value) !== JSON.stringify(initialFavouriteArtists.value) ||
        JSON.stringify(dislikedArtists.value) !== JSON.stringify(initialDislikedArtists.value)
      );
    });

    const updateUserProfile = async () => {
      if (isFormValid.value && isFormChanged.value) {
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

          // Update initial values
          initialFirstName.value = firstName.value;
          initialLastName.value = lastName.value;
          initialPhone.value = phone.value;
          initialCountry.value = country.value;
          initialFavouriteArtists.value = [...favouriteArtists.value];
          initialDislikedArtists.value = [...dislikedArtists.value];
        } catch (error) {
          alert('Failed to update profile: ' + error.message);
        }
      } else {
        alert('Please fill in all fields.');
      }
    };

    const addFavouriteArtist = () => {
      if (favouriteArtists.value.length < 5) {
        favouriteArtists.value.push('');
      }
    };

    const removeFavouriteArtist = (index) => {
      favouriteArtists.value.splice(index, 1);
    };

    const addDislikedArtist = () => {
      if (dislikedArtists.value.length < 5) {
        dislikedArtists.value.push('');
      }
    };

    const removeDislikedArtist = (index) => {
      dislikedArtists.value.splice(index, 1);
    };

    const tokenCount = computed(() => authStore.user.tokens);

    const tokenImage = computed(() => {
      if (tokenCount.value > 1) {
        return require('@/assets/images/header/moretokens.png');
      }
      return require('@/assets/images/header/tokens.png');
    });

    return {
      firstName,
      lastName,
      phone,
      country,
      favouriteArtists,
      dislikedArtists,
      updateUserProfile,
      isFormValid,
      isFormChanged,
      isUpdatedSuccessfully,
      addFavouriteArtist,
      removeFavouriteArtist,
      addDislikedArtist,
      removeDislikedArtist,
      tokenCount,
      tokenImage
    };
  }
};
</script>

<template>
  <div class="userinfo">
    <div class="token-display">
      <img :src="tokenImage" alt="Tokens" class="token-icon" />
      <span>{{ tokenCount }}</span>
    </div>
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
      <button @click="addFavouriteArtist" :disabled="favouriteArtists.length >= 5" class="add-button">Add Favourite Artist</button>
    </div>
    <div class="form-group">
      <label>Disliked Artists:</label>
      <div v-for="(artist, index) in dislikedArtists" :key="index" class="artist-group">
        <input v-model="dislikedArtists[index]" placeholder="Enter an artist" />
        <button @click="removeDislikedArtist(index)" class="remove-button">Remove</button>
      </div>
      <button @click="addDislikedArtist" :disabled="dislikedArtists.length >= 5" class="add-button">Add Disliked Artist</button>
    </div>
    <button :class="{ 'update-successful': isUpdatedSuccessfully }" :disabled="!isFormValid || !isFormChanged" @click="updateUserProfile" class="update-button">Update Profile</button>
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

.token-display {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
}

.token-icon {
  width: 24px;
  height: 24px;
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
  width: 100%; /* Added to make sure the label aligns properly */
}

input, textarea {
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

input:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
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

.add-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.add-button:hover:enabled {
  background-color: #4cae4c;
}

.update-button {
  align-self: flex-end; /* Changed to align button to the right */
  background-color: #5bc0de;
}

.update-button:hover {
  background-color: #46b8da;
}

.update-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.update-successful {
  animation: glow 1s ease-in-out 3;
}

@keyframes glow {
  0%, 100% { box-shadow: none; }
  50% { box-shadow: 0 0 8px 2px #28a745; }
}
</style>
