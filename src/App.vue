
<template>
  <div id="app">
    <v-btn text :to="{ name: 'Home' }">Home</v-btn>
    <v-btn text :to="{ name: 'AboutPage' }">About</v-btn>
    <router-view></router-view>
    <!-- <StarCharList /> -->
  </div>
</template>

<script>

import StarCharList from './components/StarCharList.vue';
export default {
  name: 'App',
  components: {

    StarCharList

  }
};
</script>
