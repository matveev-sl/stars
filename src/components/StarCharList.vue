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
        <CharacterCard :character="char" :liked="getIsLiked(char.id)" @like="onLike"/>
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

<script lang="ts">
import CharacterCard from './CharacterCard.vue';
import { mapActions, mapState } from 'pinia';
import { useCharactersStore } from '@/store/charactes';
import { getPage, getCharLimit } from '@/utils';
import { API_FIRST_PAGE } from '@/config';

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
      searchQuery: this.$route?.query?.search ?? '',
      currentPage: getPage(this.$route?.query?.page),
      charsPerPage: getCharLimit(this.$route?.query?.limit)
    };
  },
  computed: {
    ...mapState(useCharactersStore, [ 'getIsLiked' ]),
    currentCharacters() {
      return this.getCurrentCharacters(this.currentPage, this.charsPerPage);
    },
    mountPages() {
      return Math.ceil(this.totalCharacters / this.charsPerPage);
    },
    ...mapState(useCharactersStore, [ 'characters', 'totalCharacters' ])
  },
  watch: {
    async currentPage(newVal) {
      this.updateUrl();
      // @ts-ignore
      await this.checkCharactersPerPageLimit(newVal, this.charsPerPage, this.searchQuery);
    },
    async charsPerPage(newVal) {
      this.updateUrl();
      await this.checkCharactersPerPageLimit(this.currentPage, newVal, this.searchQuery as string);
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
  async mounted() {
    try {
      await this.checkCharactersPerPageLimit(
        this.currentPage, this.charsPerPage, this.searchQuery);
    } catch (error) {
      console.error('Error on mounted: ', error);
      this.error = 'Произошла серверная ошибка';
    }
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
      if (this.currentPage !== API_FIRST_PAGE) {
        this.currentPage = API_FIRST_PAGE;
      }
    },
    updateUrl() {
      this.$router.push({
        name: 'Home',
        replace: true,
        query: {
          search: this.searchQuery,
          page: this.currentPage,
          limit: this.charsPerPage
        }
      });
    },
    async onSearch() {
      this.updateUrl();
      if (this.searchQuery !== this.$route.query.search) {
        this.currentPage = API_FIRST_PAGE;}
      const { characters, totalCharacters } = await this.fetchCharacters(this.currentPage, this.searchQuery);
      this.setCharacters(characters);
      this.setTotalCharacters(totalCharacters);
    }
  }
};
</script>

<style scoped>
</style>
//
