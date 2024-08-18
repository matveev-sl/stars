import { createRouter, createWebHistory } from 'vue-router';
import StarCharList from '../components/StarCharList.vue';
import AboutPage from '../components/AboutPage.vue';
import CharacterDetail from '../components/CharacterDetail.vue';

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
  },
  {
    path: '/character/:id', // Динамический маршрут для детальной страницы персонажа
    name: 'CharacterDetail',
    component: CharacterDetail,
  }
];

const router = createRouter({
    history: createWebHistory('/'), // Используйте '/' напрямую
    routes
  });
  

export default router