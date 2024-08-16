import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Подключение иконок
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router'


const vuetify = createVuetify({
    components,
    directives,
  });

const pinia = createPinia()

const app = createApp(App);
  
  app.use(vuetify);
  app.use(router); // Подключение Vue Router
  app.use(pinia)
  app.mount('#app');
