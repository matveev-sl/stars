<template>
    <v-container>
      <div v-if="!character">Персонаж с айди {{ characterId }} не найден</div>
      <v-card v-else>
        <v-card-title>{{ character.name }}</v-card-title>
        <v-card-text>
          <p>Height: {{ character.height }}</p>
          <p>Mass: {{ character.mass }}</p>
          <p>Age: {{ character.age }}</p>
          <v-btn @click="toggleLike">{{ character.isLiked ? 'Liked' : 'Like' }}</v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </template>

<script lang="ts">
import { mapActions, mapState } from 'pinia';
import { useCharactersStore } from '@/store/charactes';
export default {
  name: 'CharacterDetail',
  data() {
    return {};
  },
  computed: {
    ...mapState(useCharactersStore, [ 'getCharacterById' ]),
    characterId () : number {
      return Number(this.$route.params.id);
    },
    character () {
      return this.getCharacterById(this.characterId);
    }
  },
  methods: {
    ...mapActions(useCharactersStore, [ 'onLike' ]),
    toggleLike() {
      this.onLike(this.characterId); // Используем сохраненный ID

    }
  }
};
</script>

  <style scoped>
  /* Ваши стили здесь */
  </style>
