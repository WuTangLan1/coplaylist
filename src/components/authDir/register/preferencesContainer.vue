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
      // Simplified validation logic
      return ['favouriteArtists', 'dislikedArtists'].every(type => 
        this.formData[type].some(artist => artist.trim() !== '')
      );
    }
  },
  methods: {
    validateArtist(index, type) {
      // Update input state for individual artists
      this.inputStates[type][index] = this.formData[type][index].trim() !== '';
    },
    addArtist(type) {
      if (this.formData[type].length < 5) {
        this.formData[type].push('');
        this.inputStates[type].push(false);
      }
    },
    removeArtist(type, index) {
      this.formData[type].splice(index, 1);
      this.inputStates[type].splice(index, 1);
    }
  },
  watch: {
    // Watch formData to emit validation updates dynamically
    formData: {
      deep: true,
      handler() {
        this.$emit('validation', this.isArtistsValid);
      }
    }
  },
  created() {
    // Emit initial validation status
    this.$emit('validation', this.isArtistsValid);
  }
};
</script>

<template>
  <v-container class="preferences-container" fluid>
    <v-card>
      <v-card-title class="text-h5 py-3">Preferences</v-card-title>
      <v-card-text>
        <v-form>
          <v-expansion-panels>
            <v-expansion-panel v-for="type in ['favouriteArtists', 'dislikedArtists']" :key="type">
              <v-expansion-panel-header>{{ type === 'favouriteArtists' ? 'Favourite Artists' : 'Disliked Artists' }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="(artist, index) in formData[type]" :key="type + '-' + index">
                  <v-col cols="8">
                    <v-text-field
                      v-model="formData[type][index]"
                      :rules="[v => !!v || 'Artist name is required']"
                      @blur="validateArtist(index, type)"
                      :label="type === 'favouriteArtists' ? 'Favourite Artist' : 'Disliked Artist'"
                      outlined
                      dense
                      solo
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="d-flex align-center justify-end">
                    <v-btn icon small @click="addArtist(type)" :disabled="formData[type].length >= 5">
                      <v-icon size="20">mdi-plus</v-icon>
                    </v-btn>
                    <v-btn icon small @click="removeArtist(type, index)" :disabled="artist.trim() === ''">
                      <v-icon size="20">mdi-minus</v-icon>
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
  max-width: 600px;
  margin: auto;
}

.v-btn {
  margin: 0 2px;
}

.v-card-title {
  font-weight: bold;
}

.v-icon {
  color: #444;
}

/* Responsive adjustments */
@media (min-width: 600px) {
  .preferences-container {
    padding: 20px;
  }
}
</style>
