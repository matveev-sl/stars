<template>
    <!-- Компонент списка VListItem от Vuetify -->
    <v-list-item>
      <!-- Содержимое элемента списка VListItemContent -->
        <!-- Заголовок элемента списка VListItemTitle -->
        <v-list-item-title>{{ character.name }}</v-list-item-title>
        <!-- Подзаголовок с ростом персонажа VListItemSubtitle -->
        <v-list-item-subtitle>Height: {{ character.height }}</v-list-item-subtitle>
        <!-- Подзаголовок с массой персонажа VListItemSubtitle -->
        <v-list-item-subtitle>Mass: {{ character.mass }}</v-list-item-subtitle>
        <v-list-item-subtitle>ID: {{ character.id }}</v-list-item-subtitle>
        <v-btn @click="onLikeCharacter" >
          {{ character.isLiked ? 'Liked' : 'Like' }}
        </v-btn>
    </v-list-item>
  </template>

  <script>
  export default {
    // Название компонента
    name: 'CharacterCard',
    // Определение событий (ивентов) которые может создавать (эмиттить) данный компонент
    emits: ['like'],
    // Определение пропсов, которые принимает компонент
    props: {
      // Проп character, который должен быть объектом и является обязательным
      character: {
        type: Object,
        required: true
      },
      onLike: {
        type: Function,
        required: true
      }
    },
    methods: {
    // Метод для вызова пропса onLike с передачей name персонажа
    onLikeCharacter() {
      this.$emit('like', this.character.id)
    },
  }
  }
  </script>
