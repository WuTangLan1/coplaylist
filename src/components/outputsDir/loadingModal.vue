<!-- src\components\outputsDir\loadingModal.vue -->
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      localShow: this.show
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    localShow(val) {
      this.$emit('update:show', val);
    }
  }
};
</script>

<template>
  <v-dialog v-model="localShow" persistent max-width="300">
    <v-card class="text-center">
      <v-card-text>
        <img src="@/assets/images/loading/loading.gif" alt="Loading" />
        <v-divider class="my-4"></v-divider>
        <v-icon large color="primary">mdi-music-note</v-icon>
        <v-card-title class="text-h6">Generating Playlist...</v-card-title>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>


<style scoped>
.v-dialog {
  z-index: 9999;
}

.v-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

img {
    width: 80px;
    height: 80px;
    margin-bottom: 1rem;
}
</style>
