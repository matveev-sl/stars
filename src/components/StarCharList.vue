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

        <CharacterCard
        v-for="(char, index) in currentCharacters"
        :key="index"
        :character="char" :liked="char ? getIsLiked(char.id) : false" @like="onLike"/>

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
    currentPage(newVal) {
      this.triggerServerFetch(this.currentPage, this.charsPerPage, this.searchQuery);
      this.updateUrl();
    },
    charsPerPage(newVal) {
      this.triggerServerFetch(this.currentPage, this.charsPerPage, this.searchQuery);
      this.updateUrl();
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
    this.triggerServerFetch(this.currentPage, this.charsPerPage, this.searchQuery, true);
    // try {
    //   await this.checkCharactersPerPageLimit(
    //     this.currentPage, this.charsPerPage, this.searchQuery);
    // } catch (error) {
    //   console.error('Error on mounted: ', error);
    //   this.error = 'Произошла серверная ошибка';
    // }
  },
  methods: {
    ...mapActions(useCharactersStore, [
      'getCurrentCharacters',
      'setCharacters',
      'onLike',
      'fetchCharacters',
      'checkCharactersPerPageLimit',
      'triggerServerFetch',
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
      // console.log('onSearch', this.searchQuery);
      this.$router.push({ name: 'Home', replace: true, query: { search: this.searchQuery } });
      this.currentPage = API_FIRST_PAGE;
      this.triggerServerFetch(this.currentPage, this.charsPerPage, this.searchQuery, true);
      this.updateUrl();
    }
  }
};
</script>

<style scoped>
</style>
//
