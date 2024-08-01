
<template>
  <div id="app">

<!--    <StarChar />-->
    <StarCharList />
  </div>
</template>

<script>


import StarChar from './components/StarWars.vue'
import StarCharList from './components/StarCharList.vue'
export default {
  name: 'App',
  components: {

    StarCharList,
    StarChar
  }
}
</script>


