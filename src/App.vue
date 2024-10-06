<template>
  <div id="app">
    <v-btn text="Home" :to="{ name: 'Home' }"/>
    <v-btn text="About" :to="{ name: 'AboutPage' }"/>
    <p>Лайкнутые персонажы: {{ getLikedIds }} раз.</p>
    <router-view></router-view>
 <!-- <StarCharList /> -->
  </div>
</template>

<script lang="ts">
import StarCharList from './components/StarCharList.vue';
import { useCharactersStore } from '@/store/charactes';
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
  },
  mounted() {
    
    
   
  },
  beforeUpdate() {
    this.loadLikes();
  },
  beforeUnmount() {
  
  },
  methods: {
    loadLikes() {
    const likedIdsFromStorage = localStorage.getItem('likedIds'); 
    console.log('loadLikes - likedIds from localStorage:', likedIdsFromStorage);
    if (likedIdsFromStorage) {
    const idsArray = JSON.parse(likedIdsFromStorage)
    console.log('idsArray',idsArray)
    const charactersStore = useCharactersStore(); 
    charactersStore.setLikedIds(idsArray); // Загружаем лайки из localStorage
    console.log('loadLikes - setLikedIds in store:', idsArray);  
      }
    }
    
  }
};
</script>

<style scoped>
/* Добавьте свои стили */
</style>
