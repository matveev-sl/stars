<template>
  <p>Test</p>
  <div v-if="isLoading">Загружается...</div>
  <div v-else-if="error">{{error}}</div>
  <div v-else>
    <p><strong>Name:</strong>{{ name }} </p>
    <p><strong>Height:</strong>{{ height }}</p>
    <p><strong>Mass:</strong>{{ mass }}</p>
  </div>
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
      mass: ''
    };
  },
  mounted() {
    this.isLoading = true;
    fetch('https://swapi.dev/api/pe_ople/2/?format=json')
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
          this.isLoading = false
      });
  }
};
</script>

  <style scoped>
  /* Добавьте стили, если необходимо */
  </style>
