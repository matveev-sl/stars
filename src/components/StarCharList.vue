<template>
  <v-container>
    <v-text-field
      v-model="searchQuery"
      label="Search"
      class="mt-4"
    ></v-text-field>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="isLoading">Загружается...</div>
    <div v-else>
      <v-list-item
        v-for="(char, index) in currentCharacters"
        :key="index"
        :to="{ name: 'CharacterDetail', params: { id: char.id } }"
      >
        <CharacterCard :character="char" @like="onLike" />
      </v-list-item>
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
      isLoading: false,
      error: '',
      searchDebounce: undefined,
      currentPage: API_FIRST_PAGE,
      charsPerPage: API_CHARS_PER_PAGE,
      searchQuery: ''
    };
  },
  computed: {
    currentCharacters() {
      return this.getCurrentCharacters(this.currentPage, this.charsPerPage);
    },
    mountPages() {
      return Math.ceil(this.totalCharacters / this.charsPerPage);
    },
    ...mapState(useCharactersStore, [ 'characters', 'totalCharacters' ])
  },
  watch: {
    // currentPage(newVal) {
    //   this.checkCharactersPerPageLimit(newVal, this.charsPerPage, this.searchQuery);
    // },
    // charsPerPage(newVal) {
    //   this.checkCharactersPerPageLimit(this.currentPage, newVal, this.searchQuery);
    // },
    searchQuery() {
      if (this.searchDebounce) {
        clearTimeout(this.searchDebounce);
      }
      this.searchDebounce = setTimeout(() => {
        this.onSearch();
      }, 1000);
    }
  },
  async mounted() {

    const error = await this.checkCharactersPerPageLimit(
      this.currentPage, this.charsPerPage, this.searchQuery);

    this.error = error;
  },
  methods: {
    ...mapActions(useCharactersStore, [
      'getCurrentCharacters',
      'setCharacters',
      'onLike',
      'fetchCharacters',
      'checkCharactersPerPageLimit',
      'setTotalCharacters'
    ]),
    onCharsPerPageChange() {
      this.currentPage = API_FIRST_PAGE;
    },
    async onSearch() {
      // this.$router.push({ name: 'Home', replace: true, query: { search: this.searchQuery } });
      // this.currentPage = API_FIRST_PAGE;
      // const { characters, totalCharacters } = await this.fetchCharacters(this.currentPage, this.searchQuery);
      // this.setCharacters(characters);
      // this.setTotalCharacters(totalCharacters);
    }
  }
};
</script>

<style scoped>
</style>
