// src/useDiscoverStore.js
import { defineStore } from 'pinia';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore'; 
import { db } from '@/components/fbDir/fbInit';

function getRandomUniqueArtists(details, count) {
  const uniqueArtists = Array.from(new Set(details.map(song => song.artist)));
  const shuffled = uniqueArtists.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export const useDiscoverStore = defineStore('discover', {
  state: () => ({
    topRatedPlaylists: [],
    newDiscoveries: [],
  }),
  actions: {
    async fetchNewDiscoveries(limitCount = 24) {
      const playlistCollection = collection(db, 'playlists');
      const q = query(playlistCollection, orderBy('createdAt', 'desc'), limit(limitCount));
      try {
        const querySnapshot = await getDocs(q);
        const playlists = [];
        querySnapshot.forEach((doc) => {
          const playlistData = doc.data();
          const uniqueArtists = getRandomUniqueArtists(playlistData.details, 3);
          playlists.push({
            id: doc.id,
            name: playlistData.name,
            creatorName: playlistData.creator_name,
            displayGenre: playlistData.display_genre,
            songs: playlistData.details.map(song => `${song.title} - ${song.artist}`), // Ensure songs are included
            uniqueArtists,
          });
        });
        this.newDiscoveries = playlists;
        console.log(this.newDiscoveries)
      } catch (error) {
        console.error('Error fetching new discoveries:', error);
      }
    },
    async fetchTopRatedPlaylists(limitCount = 20) {
      const playlistCollection = collection(db, 'playlists');
      const q = query(playlistCollection, orderBy('likes', 'desc'), limit(limitCount));
      try {
        const querySnapshot = await getDocs(q);
        const playlists = [];
        querySnapshot.forEach((doc) => {
          const playlistData = doc.data();
          playlists.push({
            id: doc.id,
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
    }
  },
});
