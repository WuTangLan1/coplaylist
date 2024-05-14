<!-- src\components\authDir\register\preferencesContainer.vue -->

<script>
export default {
  name: 'PreferencesContainer',
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      inputStates: {
        favouriteArtists: this.formData.favouriteArtists.map(() => false),
        dislikedArtists: this.formData.dislikedArtists.map(() => false)
      }
    };
  },
  computed: {
    isArtistsValid() {
      const validFavouriteArtists = this.formData.favouriteArtists.filter(artist => artist.trim() !== '').length > 0;
      const validDislikedArtists = this.formData.dislikedArtists.filter(artist => artist.trim() !== '').length > 0;
      const isValid = validFavouriteArtists && validDislikedArtists;
      this.$emit('validation', isValid);
      return isValid;
    }
  },
  methods: {
    validateArtist(index, type) {
      this.inputStates[type][index] = this.formData[type][index].trim() !== '';
      this.$emit('validation', this.isArtistsValid); // Emit validation status immediately
    },
    addArtist(type) {
      if (this.formData[type].length < 5) {
        this.formData[type].push('');
        this.inputStates[type].push(false);
        this.$emit('validation', this.isArtistsValid); // Re-validate when adding an artist
      }
    },
    removeArtist(type, index) {
      this.formData[type].splice(index, 1);
      this.inputStates[type].splice(index, 1);
      this.$emit('validation', this.isArtistsValid); // Re-validate when removing an artist
    }
  },
  created() {
    this.$emit('validation', this.isArtistsValid);
  }
};
</script>

<template>
  <div class="preferences-container">
    <h2>Preferences</h2>
    <form @submit.prevent="submitPreferences">
      <fieldset>
        <legend>Favourite Artists</legend>
        <div v-for="(artist, index) in formData.favouriteArtists" :key="'fav-' + index" class="input-group">
          <input type="text"
                 v-model="formData.favouriteArtists[index]"
                 :class="{'input-valid': inputStates.favouriteArtists[index], 'input-invalid': !inputStates.favouriteArtists[index]}"
                 @blur="validateArtist(index, 'favouriteArtists')"
                 placeholder="Enter artist"
                 aria-label="Favourite Artist">
          <div class="button-row">
            <button type="button" @click="addArtist('favouriteArtists')" :disabled="formData.favouriteArtists.length >= 5" class="add-btn">Add</button>
            <button type="button" @click="removeArtist('favouriteArtists', index)" :disabled="artist.trim() === ''" class="remove-btn">Remove</button>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Disliked Artists</legend>
        <div v-for="(artist, index) in formData.dislikedArtists" :key="'dis-' + index" class="input-group">
          <input type="text"
                 v-model="formData.dislikedArtists[index]"
                 :class="{'input-valid': inputStates.dislikedArtists[index], 'input-invalid': !inputStates.dislikedArtists[index]}"
                 @blur="validateArtist(index, 'dislikedArtists')"
                 placeholder="Enter artist"
                 aria-label="Disliked Artist">
          <div class="button-row">
            <button type="button" @click="addArtist('dislikedArtists')" :disabled="formData.dislikedArtists.length >= 5" class="add-btn">Add</button>
            <button type="button" @click="removeArtist('dislikedArtists', index)" :disabled="artist.trim() === ''" class="remove-btn">Remove</button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>


<style scoped>
.preferences-container {
  background-color: #f4f4f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
}

input, button {
  padding: 8px; 
  margin-top: 10px;
}

.input-valid {
  border-color: lightblue;
  box-shadow: 0 0 2px lightblue;
}

.input-invalid {
  border-color: lightcoral;
  box-shadow: 0 0 2px lightcoral;
}

.description {
  margin-bottom: 10px;
  color: #666;
  text-align: center;
  max-width: 100%;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input[type="text"] {
  border-radius: 0.2rem;
  border: 1px solid #ccc; 
  width: 90%; 
}

.button-row {
  display: flex;
  justify-content: space-between; 
  width: 90%; 
  margin-top: 10px;
}

.remove-btn, .add-btn {
  margin-left: 5px;
  border-radius: 5px; 
  width: 48%; 
  height: 2rem; 
}

.remove-btn {
  background-color: rgb(245, 207, 184);
  color: black;
}

.add-btn {
  background-color: rgb(174, 255, 205);
  color: black;
}

.add-btn:disabled, .remove-btn:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed; 
}

fieldset {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
}
</style>

