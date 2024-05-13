<!-- src\components\authDir\register\preferencesContainer.vue -->

<script>
export default {
  name: 'PreferencesContainer',
  data() {
    return {
      favouriteArtists: [''],
      dislikedArtists: ['']
    };
  },
  methods: {
    addArtist(list) {
      if (list.length < 5) {
        list.push('');
      }
    },
    removeArtist(list, index) {
      if (list.length > 1 && list[index] !== '') { 
        list.splice(index, 1);
      }
    },
    submitPreferences() {
      console.log("Favourite Artists:", this.favouriteArtists);
      console.log("Disliked Artists:", this.dislikedArtists);
    }
  }
};
</script>


<template>
  <div class="preferences-container">
    <h2>Preferences</h2>
    <form @submit.prevent="submitPreferences">
      <fieldset>
        <legend>Favourite Artists</legend>
        <div v-for="(artist, index) in favouriteArtists" :key="'fav-' + index" class="input-group">
          <input type="text" v-model="favouriteArtists[index]" placeholder="Enter artist" aria-label="Favourite Artist">
          <div class="button-row">
            <button type="button" @click="addArtist(favouriteArtists)" :disabled="favouriteArtists.length >= 5" class="add-btn">Add Artist</button>
            <button type="button" @click="removeArtist(favouriteArtists, index)" :disabled="favouriteArtists[index] === ''" class="remove-btn">Remove</button>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Disliked Artists</legend>
        <div v-for="(artist, index) in dislikedArtists" :key="'dis-' + index" class="input-group">
          <input type="text" v-model="dislikedArtists[index]" placeholder="Enter artist" aria-label="Disliked Artist">
          <div class="button-row">
            <button type="button" @click="addArtist(dislikedArtists)" :disabled="dislikedArtists.length >= 5" class="add-btn">Add Artist</button>
            <button type="button" @click="removeArtist(dislikedArtists, index)" :disabled="dislikedArtists[index] === ''" class="remove-btn">Remove</button>
          </div>
        </div>
      </fieldset>

      <button type="submit" class="submit-btn">Finish</button>
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
  padding: 10px;
  margin-top: 10px;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.remove-btn, .add-btn {
  margin-left: 10px;
  border-radius: 0.2rem;
  width: 90%;
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
  cursor: not-allowed; /* Additional visual cue */
}

.submit-btn {
  display: block;
  margin: 20px auto;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

fieldset {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
}
</style>
