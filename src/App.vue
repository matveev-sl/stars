<template>
  <div id="app">
    <v-btn text="Home" :to="{ name: 'Home' }"/>
    <v-btn text="About" :to="{ name: 'AboutPage' }"/>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { useCharactersStore } from '@/store/charactes';

export default {
  name: 'App',
  data() {
    return {
      visitCount: 0
    };
  },
  mounted() {
    this.loadLikes();
  },
  methods: {
    loadLikes() {
      const likedIdsFromStorage = localStorage.getItem('likedIds');
      if (likedIdsFromStorage) {
        const idsArray = JSON.parse(likedIdsFromStorage);
        const charactersStore = useCharactersStore();
        charactersStore.setLikedIds(idsArray); // Загружаем лайки из localStorage
      }
    }
  }
};
</script>
