<template>
  <v-container>
    <v-text-field
      v-model="searchQuery"
      label="Search"
      class="mt-4"
    ></v-text-field>
    <!-- Проверка, идет ли загрузка данных -->
    <div v-if="error">{{ error }}</div>
    <!-- Если нет загрузки и ошибки, отображается список персонажей -->
    <div v-else-if="isLoading">Загружается...</div>
    <!-- Проверка, есть ли ошибка -->
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
const API_CHARS_PER_PAGE = 10; // api always return 10 characters

export default {
  name: 'StarCharList',
  components: {
    CharacterCard
  },
  data() {
    return {
      searchDebounce: undefined,
      currentPage: API_FIRST_PAGE, // Инициализация текущей страницы как 1
      charsPerPage: API_CHARS_PER_PAGE,
      searchQuery: ''
    };
  },
  computed: {
    // Вычисляемые данные для текущих персонажей на основе текущей страницы
    currentCharacters() {
      return this.getCurrentCharacters(this.currentPage, this.charsPerPage);
    },
    mountPages() {
      return Math.ceil(this.totalCharacters / this.charsPerPage);
    },
    ...mapState(useCharactersStore, [
      'characters',
      'isLoading',
      'error',
      'totalCharacters'
    ])
  },
  watch: {
    currentPage(newVal) {
      this.checkCharactersPerPageLimit(newVal, this.charsPerPage, this.searchQuery);
    },
    charsPerPage(newVal) {
      this.checkCharactersPerPageLimit(this.currentPage, newVal, this.searchQuery);
    },
    searchQuery() {
      // Сбрасываем предыдущий таймаут (если есть)
      if (this.searchDebounce) {
        clearTimeout(this.searchDebounce);
      }
      // Запускаем поиск через 1 секунду
      this.searchDebounce = setTimeout(() => {
        this.handleSearch(); // Используем переименованный метод
      }, 1000);
    }
  },
  async mounted() {
    // Загружаем персонажей для первой страницы при монтировании компонента
    this.isLoading = true;
    const { characters, totalCharacters } =
      await this.fetchCharacters(API_FIRST_PAGE, this.searchQuery);
    this.setCharacters(characters);
    this.totalCharacters = totalCharacters;
    this.isLoading = false;
  },
  async created() {
    // Получаем ID персонажа из параметров маршрута.
    const searchQuery = this.$route.query.search;
    if (searchQuery) {
      this.searchQuery = searchQuery;
    }
  },
  methods: {
    ...mapActions(useCharactersStore, [
      'getCurrentCharacters',
      'setCharacters',
      'onLike',
      'fetchCharacters',
      'checkCharactersPerPageLimit',
      'onSearch' // Это действие из стора
    ]),

    onCharsPerPageChange() {
      this.currentPage = API_FIRST_PAGE;
    },

    async handleSearch() {
      // Переименованный метод для поиска
      this.$router.push({
        name: 'Home',
        replace: true,
        query: { search: this.searchQuery }
      });
      this.currentPage = API_FIRST_PAGE;
      this.isLoading = true;
      const { characters, totalCharacters } =
        await this.onSearch(this.currentPage, this.searchQuery); // Вызов действия из стора
      this.setCharacters(characters);
      this.totalCharacters = totalCharacters;
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
/* Ваши стили */
</style>
