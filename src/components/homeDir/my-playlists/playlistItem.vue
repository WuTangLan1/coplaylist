<!-- src\components\homeDir\my-playlists\playlistItem.vue -->
<script>
import confirmdelModal from './confirmdelModal.vue'
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '@/components/fbDir/fbInit';

export default {
  components : {
    confirmdelModal
  },
  props: {
    playlist: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      showConfirmModal: false,
      baseUrl : process.env.VUE_APP_API_BASE_URL
    };
  },
  computed: {
    visibleSongs() {
      return this.isOpen ? this.playlist.details : this.playlist.details.slice(0, 3);
    },
    hiddenSongs() {
      return this.playlist.details.slice(3);
    },
    buttonText() {
      return this.isOpen ? 'Close' : 'Open';
    }
  },
  methods: {
    formatDate(timestamp) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    },
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    async toggleFavourite() {
      try {
        const newFavourited = !this.playlist.favourited;
        const playlistRef = doc(db, 'playlists', this.playlist.id);
        await updateDoc(playlistRef, { favourited: newFavourited });
        this.playlist.favourited = newFavourited; // Update local state
      } catch (error) {
        console.error('Error updating favourited status:', error);
      }
    },
    openConfirmModal() {
      this.showConfirmModal = true;
    },
    closeConfirmModal() {
      this.showConfirmModal = false;
    },
    confirmDelete() {
      this.$emit('delete', this.playlist.id);
      this.showConfirmModal = false;
    },
    exportToSpotify(playlist) {
        const trackDetails = playlist.details.map(song => ({
            title: song.title,
            artist: song.artist,
            releaseYear: song.releaseYear,
            previewUrl: song.previewUrl  // This might still be null; ensure other details are correct
        }));
        sessionStorage.setItem('trackDetails', JSON.stringify(trackDetails)); 
        sessionStorage.setItem('playlistName', JSON.stringify(playlist.name));  
        const url = `${this.baseUrl}/auth/spotify/export?playlist_id=${playlist.id}`;
        window.open(url, '_blank'); 
    }
  }
}
</script>

<template>
  <v-card class="ma-5" :class="{ 'open': isOpen }">
    <v-card-title class="d-flex justify-space-between align-center">
      <div>{{ playlist.name }}</div>
      <v-btn icon @click="toggleFavourite">
        <v-icon color="red">{{ playlist.favourited ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-btn>
      <v-btn @click="toggleOpen">{{ buttonText }}</v-btn>
    </v-card-title>

    <v-card-text>
      <v-list>
        <v-list-item v-for="(song, index) in visibleSongs" :key="index">
          <v-list-item-title>{{ song.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ song.artist }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <div v-if="isOpen" class="text-right">
        <v-btn color="red" @click="openConfirmModal">Remove</v-btn>
        <v-btn color="green" @click="exportToSpotify(playlist)">Export to Spotify</v-btn>
      </div>
      <v-fade-transition>
        <div v-if="hiddenSongs.length > 0 && !isOpen" class="text-center">
          <v-icon>mdi-dots-horizontal</v-icon>
          {{ hiddenSongs.length }} more songs...
        </div>
      </v-fade-transition>
    </v-card-text>
    <confirmdelModal v-if="showConfirmModal" @close="closeConfirmModal" @confirm="confirmDelete" />
  </v-card>
</template>


<style scoped>
.open {
  max-height: none !important;
}
</style>
