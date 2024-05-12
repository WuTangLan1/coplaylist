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
      list.splice(index, 1);
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
            <button type="button" @click="removeArtist(favouriteArtists, index)" class="remove-btn">Remove</button>
          </div>
          <button type="button" @click="addArtist(favouriteArtists)" :disabled="favouriteArtists.length >= 5" class="add-btn">Add Artist</button>
        </fieldset>
        
        <fieldset>
          <legend>Disliked Artists</legend>
          <div v-for="(artist, index) in dislikedArtists" :key="'dis-' + index" class="input-group">
            <input type="text" v-model="dislikedArtists[index]" placeholder="Enter artist" aria-label="Disliked Artist">
            <button type="button" @click="removeArtist(dislikedArtists, index)" class="remove-btn">Remove</button>
          </div>
          <button type="button" @click="addArtist(dislikedArtists)" :disabled="dislikedArtists.length >= 5" class="add-btn">Add Artist</button>
        </fieldset>
        
        <button type="submit" class="submit-btn">Finish</button>
      </form>
    </div>
  </template>
  
  <style scoped>
  .preferences-container {
    padding: 20px;
    max-width: 600px;
    margin: auto;
  }
  
  input, button {
    padding: 10px;
    margin-top: 10px;
    width: 90%;
  }
  
  .input-group {
    display: flex;
    align-items: center;
  }
  
  input {
    flex-grow: 1;
  }
  
  .remove-btn, .add-btn {
    margin-left: 10px;
    border-radius: 0.2rem;
  }

  .remove-btn {
    background-color: rgb(190, 50, 50);
    color: white;
  }

  .add-btn {
    background-color: rgb(26, 113, 40);
    color: white;
  }
  
  .add-btn:disabled {
    background-color: #ccc;
    color: #666;
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
  
