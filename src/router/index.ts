import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import StarCharList from '../components/StarCharList.vue';
import AboutPage from '../components/AboutPage.vue';
import CharacterDetail from '../components/CharacterDetail.vue';
import NotFound from '../components/NotFound.vue';

// Определяем типы для маршрутов
const routes: Array<RouteRecordRaw> = [
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
    props: route => ({ id: Number(route.params.id) }) // Преобразуем id в число
  },
  {
    path: '/:catchAll(.*)', // Ловим все несуществующие маршруты
    name: 'NotFound',
    component: NotFound
  }
];

// Создаем маршрутизатор с учетом TypeScript
const router = createRouter({
  history: createWebHistory('/'),
  routes // маршруты типизированы автоматически
});

export default router;
