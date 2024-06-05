<!-- src\components\homeDir\info-section\logError\errorSide.vue -->

<script>
import { useErrorStore } from '@/stores/useErrorStore';
export default {
  name: "ErrorSide",
  data() {
    return {
      errorMessage: '',
    };
  },
  methods: {
    submitError() {
      const errorStore = useErrorStore();
      errorStore.logError(this.errorMessage)
        .then(() => {
          console.log("Error submitted successfully");
          this.$emit('closeErrorSide');
        })
        .catch(error => {
          console.error("Failed to submit error: ", error);
        });
    },
    closeErrorForm() {
      this.$emit('closeErrorSide');
    }
  }
};
</script>

<template>
  <div class="modal-backdrop">
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
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Dark overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; /* Ensure it's on top */
}

.error-report-section {
  max-width: 600px;
  width: 90%; /* Responsive width */
  margin: auto;
  transition: transform 0.3s ease-out;
  transform: translateY(-20px); /* Slight animation on open */
  animation: slideIn 0.3s forwards; /* Smooth slide-in effect */
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Improvements for smaller screens */
@media (max-width: 600px) {
  .error-report-section {
    width: 95%;
  }
}
</style>
