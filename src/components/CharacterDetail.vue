<template>
    <v-container>
      <v-card>
        <v-card-title>{{ character.name }}</v-card-title>
        <v-card-subtitle>ID: {{ character.id }}</v-card-subtitle>
        <v-card-text>
          <p>Height: {{ character.height }}</p>
          <p>Mass: {{ character.mass }}</p>
          <p>Age: {{ character.age }}</p>
          <!-- Добавьте другие детали персонажа, если необходимо -->
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'CharacterDetail',
    data() {
      return {
        character: {}
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
          console.error("Произошла ошибка", e);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ваши стили здесь */
  </style>
  