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
  <v-container class="preferences-container" max-width="500px">
    <v-card>
      <v-card-title>Preferences</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitPreferences">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>Favourite Artists</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="(artist, index) in formData.favouriteArtists" :key="'fav-' + index">
                  <v-col>
                    <v-text-field
                      v-model="formData.favouriteArtists[index]"
                      :rules="[v => !!v || 'Artist name is required']"
                      @blur="validateArtist(index, 'favouriteArtists')"
                      label="Favourite Artist"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn @click="addArtist('favouriteArtists')" :disabled="formData.favouriteArtists.length >= 5" class="add-btn">
                      Add
                    </v-btn>
                    <v-btn @click="removeArtist('favouriteArtists', index)" :disabled="artist.trim() === ''" class="remove-btn">
                      Remove
                    </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Disliked Artists</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="(artist, index) in formData.dislikedArtists" :key="'dis-' + index">
                  <v-col>
                    <v-text-field
                      v-model="formData.dislikedArtists[index]"
                      :rules="[v => !!v || 'Artist name is required']"
                      @blur="validateArtist(index, 'dislikedArtists')"
                      label="Disliked Artist"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn @click="addArtist('dislikedArtists')" :disabled="formData.dislikedArtists.length >= 5" class="add-btn">
                      Add
                    </v-btn>
                    <v-btn @click="removeArtist('dislikedArtists', index)" :disabled="artist.trim() === ''" class="remove-btn">
                      Remove
                    </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
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

