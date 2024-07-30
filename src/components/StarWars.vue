<template>
  <p>Test</p>
    <div>
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
      name: '',
      height: '',
      mass: ''
    };
  },
  mounted() {
    fetch('https://swapi.dev/api/people/2/?format=json')
      .then(response => response.json())
      .then(data => {
        this.name = data.name;
        this.height = data.height;
        this.mass = data.mass;
      });
  }
};
</script>
  
  <style scoped>
  /* Добавьте стили, если необходимо */
  </style>
  