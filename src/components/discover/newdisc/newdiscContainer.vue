<!-- src/components/discover/newdisc/newdiscContainer.vue -->
<script>
import { useDiscoverStore } from '@/stores/useDiscoverStore';
import { computed, onMounted } from 'vue';
import Masonry from 'vue-masonry-css';

export default {
  name: 'newdiscContainer',
  components: {
    Masonry
  },
  setup(props, { emit }) {
    const discoverStore = useDiscoverStore();
    const newDiscoveries = computed(() => {
      const data = discoverStore.newDiscoveries;
      console.log(data); 
      return data;
    });

    const showModal = (playlist) => {
      emit('show-modal', playlist);
    };

    onMounted(async () => {
      await discoverStore.fetchNewDiscoveries();
    });

    return {
      newDiscoveries,
      showModal,
    };
  },
};

</script>


<template>
  <div class="newdisc-container" v-if="newDiscoveries && newDiscoveries.length">
    <div class="grid-container">
      <v-card
        class="playlist-line"
        v-for="(playlist, index) in newDiscoveries"
        :key="index"
        @click="showModal(playlist)"
      >
        <v-card-title>{{ playlist.name }}</v-card-title>
        <v-card-subtitle>by {{ playlist.creatorName }} in {{ playlist.displayGenre }}</v-card-subtitle>
        <v-card-text>
          <span v-for="(song, idx) in playlist.songs" :key="idx">
            {{ song }}<span v-if="idx < playlist.songs.length - 1">, </span>
          </span>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.newdisc-container {
  width: 100%;
  margin: 0 auto;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}
</style>