<!-- src\components\authDir\register\preferencesContainer.vue -->
<script>
export default {
  name: 'PreferencesContainer',
  data() {
    return {
      favouriteArtists: ['', '', ''],
      dislikedArtists: ['', '', '']
    };
  },
  methods: {
    submitPreferences() {
      console.log("Favourite Artists:", this.favouriteArtists);
      console.log("Disliked Artists:", this.dislikedArtists);
      // Here, you would typically handle the submission to your backend or store.
    }
  }
};
</script>

<template>
  <div>
    <h2>Preferences</h2>
    <form @submit.prevent="submitPreferences">
      <div>
        <h3>Favourite Artists</h3>
        <input v-for="(artist, index) in favouriteArtists" :key="'fav-' + index" v-model="favouriteArtists[index]" placeholder="Enter artist">
      </div>
      <div>
        <h3>Disliked Artists</h3>
        <input v-for="(artist, index) in dislikedArtists" :key="'dis-' + index" v-model="dislikedArtists[index]" placeholder="Enter artist">
      </div>
      <button type="submit">Finish</button>
    </form>
  </div>
</template>

<style scoped>
input, button {
    display: block;
    margin-top: 10px;
    padding: 8px;
    width: 100%;
}
h3 {
    margin-top: 20px;
}
</style>
