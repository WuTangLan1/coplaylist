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
  computed: {
    isArtistsValid() {
      const isValid = this.formData.favouriteArtists.every(artist => artist.trim() !== '') &&
                      this.formData.dislikedArtists.every(artist => artist.trim() !== '');
      this.$emit('validation', isValid);
      return isValid;
    }
  },
  methods: {
    addArtist(listName) {
      if (this.formData[listName].length < 5) {
        this.formData[listName].push('');
      }
    },
    removeArtist(listName, index) {
      if (this.formData[listName].length > 1) {
        this.formData[listName].splice(index, 1);
      }
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
          <input type="text" v-model="formData.favouriteArtists[index]" placeholder="Enter artist" aria-label="Favourite Artist">
          <div class="button-row">
            <button type="button" @click="addArtist('favouriteArtists')" :disabled="formData.favouriteArtists.length >= 5" class="add-btn">Add Artist</button>
            <button type="button" @click="removeArtist('favouriteArtists', index)" :disabled="artist.trim() === ''" class="remove-btn">Remove</button>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Disliked Artists</legend>
        <div v-for="(artist, index) in formData.dislikedArtists" :key="'dis-' + index" class="input-group">
          <input type="text" v-model="formData.dislikedArtists[index]" placeholder="Enter artist" aria-label="Disliked Artist">
          <div class="button-row">
            <button type="button" @click="addArtist('dislikedArtists')" :disabled="formData.dislikedArtists.length >= 5" class="add-btn">Add Artist</button>
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
  background-color: rgb(190, 50, 50);
  color: white;
}

.add-btn {
  background-color: rgb(26, 113, 40);
  color: white;
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

