<template>
    <v-container>
      <div v-if="!character">Загружается...</div>
      <v-card v-else>
        <v-card-title>{{ character.name }}</v-card-title>
        <v-card-text>
          <p>Height: {{ character.height }}</p>
          <p>Mass: {{ character.mass }}</p>
          <p>Age: {{ character.age }}</p>
          <v-btn @click="toggleLike">{{ isLiked ? 'Liked' : 'Like' }}</v-btn>
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
    ...mapState(useCharactersStore, [ 'getCharacterById', 'getIsLiked' ]),
    characterId () : number {
      return Number(this.$route.params.id);
    },
    character () {
      return this.getCharacterById(this.characterId);
    },
    isLiked() {
      return this.getIsLiked(this.characterId);
    }
  },
  mounted() {
    this.checkCharacter(this.characterId);
  },
  methods: {
    ...mapActions(useCharactersStore, [ 'onLike', 'checkCharacter' ]),
    toggleLike() {
      this.onLike(this.characterId); // Используем сохраненный ID
    }
  }
};
</script>
