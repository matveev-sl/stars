<template>
    <!-- Компонент списка VListItem от Vuetify -->
    <v-list-item>
      <!-- Содержимое элемента списка VListItemContent -->
      <v-list-item-subtitle>ID: {{ character.id }}</v-list-item-subtitle>
        <!-- Заголовок элемента списка VListItemTitle -->
        <v-list-item-title>{{ character.name }}</v-list-item-title>
        <!-- Подзаголовок с ростом персонажа VListItemSubtitle -->
        <v-list-item-subtitle>Height: {{ character.height }}</v-list-item-subtitle>
        <!-- Подзаголовок с массой персонажа VListItemSubtitle -->
        <v-list-item-subtitle>Mass: {{ character.mass }}</v-list-item-subtitle>
        <v-list-item-subtitle>Age: {{ character.age }}</v-list-item-subtitle>
        <v-btn @click.stop.prevent="onLikeCharacter" >
          {{ liked ? 'Liked' : 'Like' }}
        </v-btn>
    </v-list-item>
  </template>

<script lang="ts">
import { PropType } from 'vue';
import { Character } from '@/mapping';

export default {
  // Название компонента
  name: 'CharacterCard',
  // Определение пропсов, которые принимает компонент
  props: {
    // Проп character, который должен быть объектом и является обязательным
    character: {
      type: Object as PropType<Character>,
      required: true
    },
    liked: {
      type: Boolean,
      required: true
    },
    onLike: {
      type: Function,
      required: true
    }
  },
  // Определение событий (ивентов) которые может создавать (эмиттить) данный компонент
  emits: [ 'like' ],
  methods: {
    // Метод для вызова пропса onLike с передачей name персонажа
    onLikeCharacter() {
      this.$emit('like', this.character.id);
    }
  }
};
</script>
