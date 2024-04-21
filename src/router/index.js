// src\router\index.js
import { createRouter, createWebHistory } from 'vue-router';
import homeView from '../views/homeView.vue';
import ToneContainer from '../components/inputsDir/toneContainer.vue';
import VibeContainer from '../components/inputsDir/vibeContainer.vue';
import SongsContainer from '../components/inputsDir/songsContainer.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: homeView
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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
