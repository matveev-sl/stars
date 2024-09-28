<template>
  <div id="app">
    <v-btn text :to="{ name: 'Home' }">Home</v-btn>
    <v-btn text :to="{ name: 'AboutPage' }">About</v-btn>
    <p>Лайкнутые персонажы: {{ getLikedIds }} раз.</p>
    <router-view></router-view>
 <!-- <StarCharList /> -->
  </div>
</template>

<script>
import StarCharList from './components/StarCharList.vue';
import { useCharactersStore } from '@/store/charactes.ts';
import { mapState } from 'pinia';

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
  computed: {
    ...mapState(useCharactersStore, [ 'getLikedIds' ])
    // getLikedIds_2 () {
    //   return this.getLikedIds();
    // }
  },
  mounted() {
    this.countVisits();
    // const charactersStore = useCharactersStore();
    // charactersStore.loadCharacters();
  },
  beforeUnmount() {
    localStorage.setItem('visitCount', this.visitCount);
    localStorage.setItem('likedId', this.characters);

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
