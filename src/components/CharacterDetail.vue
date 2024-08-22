<template>
    <v-container>
      <v-card>
      <!-- Показываем скелетон, пока данные загружаются -->
      <v-skeleton-loader
        v-if="isLoading"
        type="card"
        width="100%"
        height="200px"
      ></v-skeleton-loader>
      <v-card v-else>
        <v-card-title>{{ character.name }}</v-card-title>
        <v-card-text>
          <p>Height: {{ character.height }}</p>
          <p>Mass: {{ character.mass }}</p>
          <p>Age: {{ character.age }}</p>
          <!-- Добавьте другие детали персонажа, если необходимо -->
          <v-btn @click="Like">{{ isLiked ? 'Liked' : 'Like' }}</v-btn>
        </v-card-text>
      </v-card>
    </v-card>
    </v-container>
  </template>

<script>
import { useCharactersStore } from '@/store/charactes.js';
export default {
  name: 'CharacterDetail',
  data() {
    return {
      character: {},
      isLiked: false,
      isLoading: true
    };
  },
  async created() {
    const characterId = this.$route.params.id; // Получаем ID персонажа из параметров маршрута
    await this.fetchCharacter(characterId);
  },
  methods: {
    async fetchCharacter(id) {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        const data = await response.json();
        this.character = data;
      } catch (e) {
        console.error('Произошла ошибка', e);
      }
      finally {
        this.isLoading = !this.isLoading;
      }
    },
    Like() {
      const characterId = this.$route.params.id; // Получаем ID персонажа
      const charactersStore = useCharactersStore(); // Доступ к store
      charactersStore.onLike(characterId); // Вызываем метод onLike из store
      this.isLiked = !this.isLiked;
    }
  }
};
</script>

  <style scoped>
  /* Ваши стили здесь */
  </style>
