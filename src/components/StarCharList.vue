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
          v-on:update:modelValue="onCharsPerPageChange"
    ></v-select>
    <!-- todo: install eslint, prettier   -->
    <v-pagination
          v-model="currentPage"
          :length="mountPages"
          class="my-4"
    ></v-pagination>
  </v-container>
</template>

<script>

import CharacterCard from './CharacterCard.vue'
import { characterMap } from "@/mapping.js";
const TOTAL_CHARS_FALLBACK_VALUE = 100;
const API_FIRST_PAGE = 1; // api url for first page is /1/
const API_CHARS_PER_PAGE = 10;  // api always return 10 characters

export default {
name: 'StarCharList',
components: {
    CharacterCard
  },
  data() {
    return {
      isLoading: false,   // Инициализация состояния загрузки как false
      error: '',          // Инициализация сообщения об ошибке как пустая строка
      currentPage: API_FIRST_PAGE,     // Инициализация текущей страницы как 1
      characters: [],     // Инициализация массива персонажей как пустого,
      charsPerPage : API_CHARS_PER_PAGE,
      totalCharacters: TOTAL_CHARS_FALLBACK_VALUE,
      searchQuery: '',
      searchResult: []
    }
  },
  
  async mounted() {
    // Загружаем персонажей для первой страницы при монтировании компонента
    this.isLoading = true
    const { characters, totalCharacters } = await this.fetchCharacters(API_FIRST_PAGE, this.searchQuery)
    this.characters = characters
    this.totalCharacters = totalCharacters
    this.isLoading = false
  },
  async created() {
    const searchQuery = this.$route.query.search; // Получаем ID персонажа из параметров маршрута
    if (searchQuery) {
      this.searchQuery = searchQuery
    }
  },
  computed: {
    // Вычисляемые данные для текущих персонажей на основе текущей страницы
    currentCharacters() {
      const startIdx = (this.currentPage - 1) * this.charsPerPage // Начальный индекс для текущей страницы
      return this.characters.slice(startIdx, startIdx + this.charsPerPage) // Возвращаем 10 персонажей
    },
    mountPages(){
      return Math.ceil(this.totalCharacters / this.charsPerPage);
    },
  },
  watch: {
    currentPage(newVal) {
      this.checkCharactersPerPageLimit(newVal, this.charsPerPage)
    },
    charsPerPage(newVal) {
      this.checkCharactersPerPageLimit(this.currentPage, newVal)
    },
    searchQuery(newValue) {
      this.onSearch(newValue)
    }
  },
  methods: {
    // Метод для получения персонажей с определенной страницы
    async fetchCharacters(page, search = '') {
      let url = `https://swapi.dev/api/people/?page=${page}&format=json`
      if (search.length > 0) {
        url += `&search=${search}`
      }
      return fetch(url) // Выполняем запрос к API
        .then(response => response.json()) // Парсим ответ как JSON
        .then(data => {
          return {
            totalCharacters: data.count ?? TOTAL_CHARS_FALLBACK_VALUE,
            characters: data.results.map(characterMap)
          };
        })
        .catch((e) => {
          console.error("Произошла ошибка", e); // Логируем ошибку в консоль
          this.error = "Серверная ошибка"; // Устанавливаем сообщение об ошибке
        })
    },
    async checkCharactersPerPageLimit(page, limit) {
      console.log("checkCharactersPerPageLimit", page, limit);
      if (this.currentCharacters.length >= limit * page) {
        return
      }
      this.isLoading = true
      const startPage = this.characters.length / API_CHARS_PER_PAGE + API_FIRST_PAGE
      const finalPage = Math.ceil(page * limit / API_CHARS_PER_PAGE)
      for (let page = startPage; page <= finalPage; page++) {
        // todo: improve - make calls in parallel
        const { characters, totalCharacters } = await this.fetchCharacters(page, this.searchQuery)
        this.characters = [...this.characters, ...characters]
        this.totalCharacters = totalCharacters
      }
      this.isLoading = false
    },
    onCharsPerPageChange() {
      this.currentPage = API_FIRST_PAGE
    },
    onLike(id) {
      this.characters = this.characters.map(char=> char.id === id
          ? {...char, isLiked: !char.isLiked}
          : char
      )
    },
    async onSearch(searchQuery) {
      this.$router.push({ name: 'Home', replace:true, query: { search: searchQuery } })
      this.currentPage = API_FIRST_PAGE
      this.isLoading = true
      const { characters, totalCharacters } = await this.fetchCharacters(this.currentPage, searchQuery)
      this.characters = characters
      this.totalCharacters = totalCharacters
      this.isLoading = false
    }
  },
}

</script>
<style scoped>

</style>
