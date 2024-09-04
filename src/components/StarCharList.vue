<template>
  <v-container>
    <v-text-field
      v-model="searchQuery"
      label="Search"
      class="mt-4"
    ></v-text-field>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <CharacterCard
        v-for="(char, index) in currentCharacters"
        :key="index"
        :character="char" @like="onLike"
      />
    </div>
    <v-select
      v-model="charsPerPage"
      :items="[4, 6, 10, 14, 18, 22]"
      label="Items per page"
      class="mt-4"
      density="compact"
      @update:model-value="onCharsPerPageChange"
    ></v-select>
    <v-pagination
      v-model="currentPage"
      :length="mountPages"
      class="my-4"
    ></v-pagination>
  </v-container>
</template>

<script>
import CharacterCard from './CharacterCard.vue';
import { mapActions, mapState } from 'pinia';
import { useCharactersStore } from '@/store/charactes.js';

const API_FIRST_PAGE = 1;
const API_CHARS_PER_PAGE = 10;

export default {
  name: 'StarCharList',
  components: {
    CharacterCard
  },
  data() {
    return {
      error: '',
      searchDebounce: undefined,
      currentPage: API_FIRST_PAGE,
      charsPerPage: API_CHARS_PER_PAGE,
      searchQuery: ''
    };
  },
  mounted() {
      this.triggerServerFetch(this.currentPage, this.charsPerPage, this.searchQuery, true)
    },
  computed: {
    currentCharacters() {
      return this.getCurrentCharacters(this.currentPage, this.charsPerPage);
    },
    mountPages() {
      return Math.ceil(this.totalCharacters / this.charsPerPage);
    },
    ...mapState(useCharactersStore, [ 'totalCharacters' ])
  },
  watch: {
    currentPage(newVal) {
      this.triggerServerFetch(this.currentPage, this.charsPerPage, this.searchQuery)
    },
    charsPerPage(newVal) {
      this.triggerServerFetch(this.currentPage, this.charsPerPage, this.searchQuery)
    },
    searchQuery() {
      if (this.searchDebounce) {
        clearTimeout(this.searchDebounce);
      }
      this.searchDebounce = setTimeout(() => {
        this.onSearch();
      }, 1000);
    }
  },
  methods: {
    ...mapActions(useCharactersStore, [
      'getCurrentCharacters',
      'onLike',
      'triggerServerFetch',
    ]),
    onCharsPerPageChange() {
      this.currentPage = API_FIRST_PAGE;
    },
    async onSearch() {
      console.log('onSearch', this.searchQuery)
      this.$router.push({ name: 'Home', replace: true, query: { search: this.searchQuery } });
      this.currentPage = API_FIRST_PAGE;
      this.triggerServerFetch(this.currentPage, this.charsPerPage, this.searchQuery, true)
    }
  }
};
</script>

<style scoped>
</style>
