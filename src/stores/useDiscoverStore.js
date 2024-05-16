// src/useDiscoverStore.js
import { defineStore } from 'pinia';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore'; 
import { db } from '@/components/fbDir/fbInit';

export const useDiscoverStore = defineStore('discover', {
  state: () => ({
    topRatedPlaylists: [],
    newDiscoveries: [],
  }),
  actions: {
    async fetchTopRatedPlaylists(limitCount = 20) {
      const playlistCollection = collection(db, 'playlists');
      const q = query(playlistCollection, orderBy('likes', 'desc'), limit(limitCount));
      try {
        const querySnapshot = await getDocs(q);
        const playlists = [];
        querySnapshot.forEach((doc) => {
          const playlistData = doc.data();
          playlists.push({
            name: playlistData.name,
            creatorName: playlistData.creator_name,
            displayGenre: playlistData.display_genre,
            songs: playlistData.details.map(song => `${song.title} - ${song.artist}`),
          });
        });
        this.topRatedPlaylists = playlists;
      } catch (error) {
        console.error('Error fetching top rated playlists:', error);
      }
    },
    async fetchNewDiscoveries(limitCount = 20) {
      const playlistCollection = collection(db, 'playlists');
      const q = query(playlistCollection, orderBy('createdAt', 'desc'), limit(limitCount));
      try {
        const querySnapshot = await getDocs(q);
        const playlists = [];
        querySnapshot.forEach((doc) => {
          const playlistData = doc.data();
          playlists.push({
            name: playlistData.name,
            creatorName: playlistData.creator_name,
            displayGenre: playlistData.display_genre,
            songs: playlistData.details.map(song => `${song.title} - ${song.artist}`),
          });
        });
        this.newDiscoveries = playlists;
      } catch (error) {
        console.error('Error fetching new discoveries:', error);
      }
    },
  },
});
