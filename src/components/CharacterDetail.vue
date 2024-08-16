<template>
    <v-container>
      <v-card>
        <v-card-title>{{ character.name }}</v-card-title>
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
      // todo: loading indicator
      const characterId = this.$route.params.id; // Получаем ID персонажа из параметров маршрута
      console.log(this.$route.params)

      await this.fetchCharacter(characterId);
    },
    methods: {
      async fetchCharacter(id) {
        try {
          const response = await fetch(`https://swapi.dev/api/people/${id}/`);
          const data = await response.json();
          // todo: mapping
          this.character = data;
        } catch (e) {
          // todo: error handling
          console.error("Произошла ошибка", e);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ваши стили здесь */
  </style>
  