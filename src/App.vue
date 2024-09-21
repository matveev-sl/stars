<template>
  <div id="app">
    <v-btn text :to="{ name: 'Home' }">Home</v-btn>
    <v-btn text :to="{ name: 'AboutPage' }">About</v-btn>
    <p>Вы посетили этот сайт {{ visitCount }} раз.</p>
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
  },
  data() {
    return {
      visitCount: 0
    };
  },
  mounted() {
    this.countVisits();
  },
  beforeUnmount() {
    localStorage.setItem('visitCount', this.visitCount);
  },
  methods: {
    countVisits() {
      let visits = localStorage.getItem('visitCount');
      if (visits === null) {
        visits = 1;
      } else {
        visits = parseInt(visits) + 1;
      }
      localStorage.setItem('visitCount', visits);
      this.visitCount = visits;
    }
  }
};
</script>

<style scoped>
/* Добавьте свои стили */
</style>
