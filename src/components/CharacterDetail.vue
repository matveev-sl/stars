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
          <v-btn @click="toggleLike">{{ isLiked ? 'Liked' : 'Like' }}</v-btn>
        </v-card-text>
      </v-card>
    </v-card>
    </v-container>
  </template>

<script>
import { mapActions } from 'pinia';
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
    const characterData = await this.getCharacterById(characterId);
    if (characterData) {
      this.character = characterData; // Сохраняем полученные данные
    }

    this.isLoading = false; // Завершаем загрузку
  },
  methods: {
    ...mapActions(useCharactersStore, [
      'getCharacterById', 'onLike' ]),
    toggleLike() {
      this.onLike(this.characterId); // Используем сохраненный ID
      this.isLiked = true;
    }
  }
};
</script>

  <style scoped>
  /* Ваши стили здесь */
  </style>
