<template>
 <v-container>
<div v-if="isLoading">Загружается...</div>
  <div v-else-if="error">{{error}}</div>
  <div v-else>
    <v-chip> <p><strong>Name:</strong>{{ name }} </p></v-chip>
      <v-chip> <p><strong>Height:</strong>{{ height }}</p></v-chip>
        <v-chip> <p><strong>Mass:</strong>{{ mass }}</p></v-chip>
  </div>
</v-container>
</template>
  
<script>
export default {
  name: 'StarChar',
  data() {
    return {
      isLoading: false,
      error: '',
      name: '',
      height: '',
      mass: '',
      id: ''
    };
  },
  mounted() {
    this.isLoading = true;
    fetch('https://swapi.dev/api/people/2/?format=json')
      .then(response => response.json())
      .then(data => {
        this.name = data.name ?? '-- неизвестно --';
        this.height = data.height ?? '-- неизвестно --';
        this.mass = data.mass ?? '-- неизвестно --';
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
  
  <style scoped>
  /* Добавьте стили, если необходимо */
  </style>
  