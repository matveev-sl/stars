<template>
    <v-container>
      <v-card>
        <v-card-title>{{ characterDetail.name }}</v-card-title>
        <v-card-text>
          <p>Height: {{ characterDetail.height }}</p>
          <p>Mass: {{ characterDetail.mass }}</p>
          <p>Age: {{ characterDetail.age }}</p>
          <!-- Добавьте другие детали персонажа, если необходимо -->
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import {mapActions, mapState} from 'pinia'
  import { useCharacterDetailStore } from "@/store/character-detail.js";

  export default {
    name: 'CharacterDetail',
    async created() {
      // todo: loading indicator
      const characterId = this.$route.params.id; // Получаем ID персонажа из параметров маршрута
      console.log(this.$route.params)

      await this.fetchCharacter(characterId);
    },
    computed: {
      ...mapState(useCharacterDetailStore, ['characterDetail'])
    },
    methods: {
      ...mapActions(useCharacterDetailStore, ['setCharacterDetail']),
      async fetchCharacter(id) {
        try {
          const response = await fetch(`https://swapi.dev/api/people/${id}/`);
          const data = await response.json();
          // todo: mapping
          this.setCharacterDetail(data)
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
  