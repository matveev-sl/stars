<!-- src/App.vue -->
<template>
  <div id="app">

    <StarChar />
  </div>
</template>

<script>


import StarChar from './components/StarWars.vue'

export default {
  name: 'App',
  components: {
    StarChar
  }
}
</script>

<style>
/* Стили для App.vue можно добавить здесь */
</style>
