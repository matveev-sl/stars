<template>
    <v-container>
      <v-card>

        <!-- <v-skeleton-loader
        v-if="isLoading"
        type="card"
        width="100%"
        height="200px"
      ></v-skeleton-loader>
      <v-card v-else> -->
        <v-card-title>{{ getCharacterById(characterId).name }}</v-card-title>
        <v-card-text>
          <p>Height: {{ character.height }}</p>
          <p>Mass: {{ character.mass }}</p>
          <p>Age: {{ character.age }}</p>
          <!-- Добавьте другие детали персонажа, если необходимо -->
          <v-btn @click="toggleLike">{{ character.isLiked ? 'Liked' : 'Like' }}</v-btn>
        </v-card-text>
      </v-card>
    <!-- </v-card> -->
    </v-container>
  </template>

<script>
import { mapActions, mapState } from 'pinia';
import { useCharactersStore } from '@/store/charactes.js';
export default {
  name: 'CharacterDetail',
  data() {
    return {
      // character: {},

      isLoading: true
    };
  },
  // async created() {
  //   const characterId = this.$route.params.id;
  //   console.log('Created: ', characterId);
  //   const characterData = await this.getCharacterById(characterId);
  //   if (characterData) {
  //     this.character = characterData; // Сохраняем полученные данные
  //   }
  //   console.log ('Test', characterData);
  //   this.isLoading = false; // Завершаем загрузку
  // },
  computed: {
    // ...mapState(useCharactersStore, [ 'characters' ]),
    characterId () {
      console.log('vethid');
      const ss = this.$route.params.id;
      console.log ('ss', ss);
      return ss;
    }
    // character () {
    //   return this.characters.find((char) => {
    //     return this.characterId === char.id;
    //   }) ?? null;
    // }
  },
  methods: {
    ...mapActions(useCharactersStore, [
      'getCharacterById', 'onLike' ]),
    toggleLike() {
      this.onLike(this.characterId); // Используем сохраненный ID

    }
  }
};
</script>

  <style scoped>
  /* Ваши стили здесь */
  </style>
