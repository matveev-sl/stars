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
        <button @click="onLike">Like</button>
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
      },
      onLike: {
        // type: Function ??
        required: true
      }
    },
    data(){
      return {
        isLiked_2: false // todo: тогда надо хранить это в локалстораж
      }
    },
    // methods:{
    //   onLike_3(){
    //     characters[5].isLiked = true //todo: this is impossible!!!
    //   },
    //   onLike_2() {
    //     this.isLiked = true
    //   }
    // }
  }
  </script>
