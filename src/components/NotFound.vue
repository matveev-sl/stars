<template>
    <v-container class="text-center">
      <v-row>
        <v-col>
          <h1>Страница не существует</h1>
          <p>К сожалению, страница, которую вы ищете, не найдена.</p>
          <v-btn color="primary" @click="$router.push('/')">Вернуться на главную</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script lang="ts">
export default {
  name: 'NotFound'
};
</script>

  <style scoped>
  h1 {
    font-size: 3em;
    margin-top: 2em;
  }
  p {
    font-size: 1.5em;
    margin-bottom: 2em;
  }
  </style>
