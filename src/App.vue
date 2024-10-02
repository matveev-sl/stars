<template>
  <div id="app">
    <v-btn text :to="{ name: 'Home' }">Home</v-btn>
    <v-btn text :to="{ name: 'AboutPage' }">About</v-btn>
    <p>Лайкнутые персонажы: {{ getLikedIds }} раз.</p>
    <router-view></router-view>
 <!-- <StarCharList /> -->
  </div>
</template>

<script lang="ts">
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
    this.loadLikes();
    window.addEventListener('beforeunload', this.storeSave);

  },
  beforeUnmount() {
    //   localStorage.setItem('visitCount', this.visitCount);
  },
  methods: {
    
    storeSave() {
      const ids = this.getLikedIds.join(',');
      localStorage.setItem('IDS', ids);
    },
    loadLikes() {
      const likedIds = localStorage.getItem('IDS'); 
      if (likedIds) {
    const idsArray = likedIds.split(',')
    const charactersStore = useCharactersStore(); 
    charactersStore.setLikedIds(idsArray);
      }
    }
    
  }
};
</script>

<style scoped>
/* Добавьте свои стили */
</style>
