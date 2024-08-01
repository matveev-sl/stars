<template>

        <v-container>

            <div v-if="isLoading">Загружается...</div>
            <div v-else-if="error">{{error}}</div>
            <div v-else>
                <v-list>
        <v-list-item-group v-for="(char, index) in characters" :key="index">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ char.name }}</v-list-item-title>
              <v-list-item-subtitle>Height: {{ char.height }}</v-list-item-subtitle>
              <v-list-item-subtitle>Mass: {{ char.mass }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
          <v-btn :href="previous">Назад</v-btn>
          <v-btn :href="nextPage">Вперед</v-btn>
          </div>
        </v-container>
    
  </template>
  <script>
  export default {
    name: 'StarCharList',
    data() {
      return {
        isLoading: false,
        error: '',
      
      };
    },
   
    mounted() {
      this.isLoading = true;
      fetch('https://swapi.dev/api/people/')
        .then(response => response.json())
        .then(data => {
          this.characters = data.results
          this.nextPage = data.next
          this.previous = data.previous
          console.log(data.results[0].name)
        })
        .catch((e)=> {
          console.error("Error happened", e);
          this.error = "Серверная ошибка";
        })
        .finally(() => {
            this.isLoading = false; 
        });
    }
  };
  </script>