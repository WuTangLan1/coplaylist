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
  <div class="error-report-section">
    <h2>Report an Issue</h2>
    <textarea v-model="errorMessage" placeholder="Describe the issue you encountered..."></textarea>
    <div class="buttons">
      <button @click="submitError">Submit Error</button>
      <button @click="closeErrorForm">Close</button>
    </div>
  </div>
</template>

<style scoped>
.error-report-section {
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.error-report-section h2 {
  color: #507cac;
}

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.buttons button {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #507cac;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.buttons button:hover {
  background-color: #345f8d;
}
</style>
