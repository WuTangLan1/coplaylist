// src\router\index.js
import { createRouter, createWebHistory } from 'vue-router';
import homeView from '../views/homeView.vue';
import discoverView from '../views/discoverView.vue'
import ToneContainer from '../components/inputsDir/toneContainer.vue';
import VibeContainer from '../components/inputsDir/vibeContainer.vue';
import SongsContainer from '../components/inputsDir/songsContainer.vue';
import OutputContainer from '../components/outputsDir/outputContainer.vue'
import playlistContainer from '../components/homeDir/my-playlists/playlistContainer.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: homeView
  },
  {
    path: '/discover',
    name: 'Discover',
    component: discoverView
  },
  {
    path: '/tone',
    name: 'Tone',
    component: ToneContainer
  },
  {
    path: '/vibe',
    name: 'Vibe',
    component: VibeContainer
  },
  {
    path: '/songs',
    name: 'Songs',
    component: SongsContainer
  },
  {
    path: '/output',
    name: 'Output',
    component: OutputContainer
  },
  {
    path: '/my-playlists',
    name: 'My-Playlists',
    component: playlistContainer
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
