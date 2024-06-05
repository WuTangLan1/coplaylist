<!-- src\components\homeDir\info-section\logError\errorSide.vue -->

<script>
export default {
  name: "ErrorSide",
  data() {
    return {
      errorMessage: '',
    };
  },
  methods: {
    submitError() {
      console.log("Error submitted: ", this.errorMessage);
      this.closeErrorForm(); 
    },
    closeErrorForm() {
      this.$emit('closeErrorSide');
    }
  }
};
</script>

<template>
  <v-card class="error-report-section" outlined tile>
    <v-card-title class="headline">Report an Issue</v-card-title>
    <v-card-text>
      <v-textarea
        v-model="errorMessage"
        placeholder="Describe the issue you encountered..."
        rows="3"
        auto-grow
      ></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="submitError">Submit Error</v-btn>
      <v-btn text @click="closeErrorForm">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>
<style scoped>
.error-report-section {
  max-width: 600px; /* Adjust the width as needed */
  margin: auto;
}
</style>