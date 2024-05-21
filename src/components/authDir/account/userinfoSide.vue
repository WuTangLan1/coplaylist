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

    const isFormValid = ref(false);

    const rules = {
      required: value => !!value || 'Required.',
    };

    const isUpdatedSuccessfully = ref(false);

    const isFormChanged = computed(() => {
      return (
        firstName.value !== initialFirstName.value  ||
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
      tokenImage,
      rules
    };
  }
};
</script>
<template>
  <v-container class="userinfo">
    <v-row class="token-display" justify="end">
      <v-col cols="auto">
        <v-card outlined class="token-card">
          <v-row align="center">
            <v-col cols="auto">
              <v-avatar size="36">
                <v-img :src="tokenImage" alt="Tokens" />
              </v-avatar>
            </v-col>
            <v-col cols="auto">
              <v-chip class="token-chip" color="amber" text-color="black" outlined>{{ tokenCount }}</v-chip>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-form v-model="isFormValid">
      <v-row class="form-group">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="firstName"
            label="First Name"
            :rules="[rules.required]"
            clearable
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="lastName"
            label="Last Name"
            :rules="[rules.required]"
            clearable
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="phone"
            label="Phone"
            :rules="[rules.required]"
            clearable
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="country"
            label="Country"
            :rules="[rules.required]"
            clearable
          />
        </v-col>
      </v-row>

      <v-row class="form-group">
      <v-col cols="12">
        <v-label>Disliked Artists:</v-label>
        <!-- List entries -->
        <v-row v-for="(artist, index) in dislikedArtists" :key="index" class="artist-row">
          <v-col cols="10">
            <v-text-field v-model="dislikedArtists[index]" label="Artist" clearable />
          </v-col>
          <v-col cols="1">
            <v-btn icon @click="removeDislikedArtist(index)">
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-col cols="12">
          <v-btn class="add-artist-button" color="green" @click="addDislikedArtist" :disabled="dislikedArtists.length >= 5">
            Add Disliked Artist
          </v-btn>
        </v-col>
      </v-col>
    </v-row>

    <v-row class="form-group">
      <v-col cols="12">
        <v-label>Favourite Artists:</v-label>
        <!-- List entries -->
        <v-row v-for="(artist, index) in favouriteArtists" :key="index" class="artist-row">
          <v-col cols="10">
            <v-text-field v-model="favouriteArtists[index]" label="Artist" clearable />
          </v-col>
          <v-col cols="1">
            <v-btn icon @click="removeFavouriteArtist(index)">
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-col cols="12">
          <v-btn class="add-artist-button" color="green" @click="addFavouriteArtist" :disabled="favouriteArtists.length >= 5">
            Add Favourite Artist
          </v-btn>
        </v-col>
      </v-col>
    </v-row>


      <v-row justify="end">
        <v-col cols="auto">
          <v-btn
            :disabled="!isFormValid || !isFormChanged"
            @click="updateUserProfile"
            :class="{ 'update-successful': isUpdatedSuccessfully }"
            color="primary"
          >
            Update Profile
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<style scoped>
.userinfo {
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 0.3rem;
}

.token-display {
  margin-bottom: 20px;
}

.token-card {
  padding: 8px;
  display: flex;
  align-items: center;
  border-radius: 8px;
}

.token-chip {
  font-size: 1.25rem;
  font-weight: bold;
}

.form-group {
  margin-bottom: 20px;
}

  .align-center-col {
    display: flex;
    align-items: center; 
  }

  .artist-row {
    display: flex;
    align-items: center; 
  }

  .v-btn {
    min-width: 0;
    margin-top: 0;
    height: 100%;
    margin-bottom: 15px;
  }

  .add-artist-button {
  width: 100%;  
  margin-top: 8px;
  padding: 0.5rem 0.7rem;
}


.update-successful {
  animation: glow 1s ease-in-out 3;
}

@keyframes glow {
  0%, 100% { box-shadow: none; }
  50% { box-shadow: 0 0 8px 2px #28a745; }
}
</style>