<template>
    <!-- Компонент списка VListItem от Vuetify -->
    <v-list-item>
      <!-- Содержимое элемента списка VListItemContent -->
      <v-list-item-content>
        <!-- Заголовок элемента списка VListItemTitle -->
        <v-list-item-title>{{ character.name }}</v-list-item-title>
        <!-- Подзаголовок с ростом персонажа VListItemSubtitle -->
        <v-list-item-subtitle>Height: {{ character.height }}</v-list-item-subtitle>
        <!-- Подзаголовок с массой персонажа VListItemSubtitle -->
        <v-list-item-subtitle>Mass: {{ character.mass }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </template>
  
  <script>
  export default {
    // Название компонента
    name: 'CharacterCard',
    // Определение пропсов, которые принимает компонент
    props: {
      // Проп character, который должен быть объектом и является обязательным
      character: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  