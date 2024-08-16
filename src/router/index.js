import { createRouter, createWebHistory } from 'vue-router';
import StarCharList from '../components/StarCharList.vue';
import AboutPage from '../components/AboutPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: StarCharList
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage
  }
];

const router = createRouter({
    history: createWebHistory('/'), // Используйте '/' напрямую
    routes
  });
  

export default router