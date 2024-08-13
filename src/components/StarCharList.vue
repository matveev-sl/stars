<template>
  <v-container>
    <!-- Проверка, идет ли загрузка данных -->
    <div v-if="isLoading">Загружается...</div>
    <!-- Проверка, есть ли ошибка -->
    <div v-if="error">{{ error }}</div>
    <!-- Если нет загрузки и ошибки, отображается список персонажей -->
    <div v-else>
      <v-list>
        <div v-if="isUnCount">Ошибка подсчета персонажей</div>
        <!-- Проход по каждому персонажу в currentCharacters и отображение его данных через CharacterCard -->
        <CharacterCard v-for="(char, index) in currentCharacters" :key="index" :character="char" @like="onLike"/>
      </v-list>

    </div>
    <!-- Кнопка для перехода на предыдущую страницу -->
    <v-btn @click="previousPage"  :disabled="isPrevButtonDisabled">Previous</v-btn>

    <!-- Кнопка для перехода на следующую страницу -->
    <v-btn @click="nextPage"  :disabled="isNextButtonDisabled">Next</v-btn>
    <v-progress-circular v-if="isLoading" model-value="20" :width="5" indeterminate></v-progress-circular>
    <v-select
          v-model="charPerPage"
          :items="[5, 10, 15, 20]"
          label="Items per page"
          class="mt-4"
          density="compact"
          @change="characterChange"
    ></v-select>
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

export default {
  components: {
    CharacterCard
  },
  data() {
    return {
      isLoading: false,   // Инициализация состояния загрузки как false
      error: '',          // Инициализация сообщения об ошибке как пустая строка
      currentPage: 1,     // Инициализация текущей страницы как 1
      characters: [],     // Инициализация массива персонажей как пустого,
      charPerPage : 10,
      totalCharacters: 0,
      isUnCount : false
    }
  },

  async mounted() {
    // Загружаем персонажей для первой страницы при монтировании компонента
    this.characters = await this.fetchCharacters(1)
    // Вызов метода для отключения кнопки "предыдущая"
    this.totalCharactersError();
  },
  computed: {
    // Вычисляемые данные для текущих персонажей на основе текущей страницы
    currentCharacters() {
      const startIdx = (this.currentPage - 1) * this.charPerPage // Начальный индекс для текущей страницы
      return this.characters.slice(startIdx, startIdx + this.charPerPage) // Возвращаем 10 персонажей
    },
    isNextButtonDisabled() {
      return this.currentPage > this.mountPages
    },
    isPrevButtonDisabled() {
      return this.currentPage <= 1
    },
    mountPages(){
      return Math.ceil(this.totalCharacters / this.charPerPage);
    },
    
  },

  methods: {
    // Метод для получения персонажей с определенной страницы
    fetchCharacters(page, characterPerPage) {
    this.isLoading = true; // Устанавливаем состояние загрузки в true

    // Основной запрос к текущей странице
    const fetchPage = fetch(`https://swapi.dev/api/people/?page=${page}&format=json`).then(response => response.json());

    // Если characterPerPage больше 10, делаем запрос и к следующей странице
    const fetchNextPage = characterPerPage > 10
        ? fetch(`https://swapi.dev/api/people/?page=${page + 1}&format=json`).then(response => response.json())
        : Promise.resolve(null);

    return Promise.all([fetchPage, fetchNextPage])
        .then(([data, nextData]) => {
           
          this.totalCharacters = data.count; // Обновляем общее количество персонажей
            // Объединяем результаты, если был запрос к следующей странице
            const results = nextData ? data.results.concat(nextData.results) : data.results;
            
            return results.map(characterMap); // Преобразуем данные
        })
        .catch((e) => {
            console.error("Произошла ошибка", e); // Логируем ошибку в консоль
            this.error = "Серверная ошибка"; // Устанавливаем сообщение об ошибке
        })
        .finally(() => {
            this.isLoading = false; // Сбрасываем состояние загрузки
        });
},

    characterChange() {
    
  },
    onLike(id) {
      this.characters = this.characters.map(char=> char.id === id
          ? {...char, isLiked: !char.isLiked}
          : char
      )
    },
    totalCharactersError () {
      if (this.totalCharacters === undefined ) {
        this.isUnCount = true;
      }

    },
    //Метод для перехода на следующую страницу
    async nextPage() {
      if (this.characters.length !== this.currentPage * this.charPerPage) {
        // Если количество персонажей не соответствует текущей странице, увеличиваем страницу и выходим из функции
        this.currentPage++
        // fixme: этот код не достаточно "общий", он работает только с 10 персонажами на странице.
        // fixme: даже только в том случае, когда ответ сервера и интерфейс клиента - совпадают
        return
      }
      const newCharacters = await this.fetchCharacters(this.currentPage + 1) // Получаем новых персонажей для новой страницы
      this.characters = [...this.characters, ...newCharacters] // Обновляем массив персонажей новыми данными
      this.currentPage++ // Увеличиваем текущую страницу
    },
    // Метод для перехода на предыдущую страницу
    previousPage() {
      if (this.currentPage === 1) {
        return // Если текущая страница первая, выходим из функции
      }
      this.currentPage-- // Уменьшаем текущую страницу
    },
  },
}

</script>
<style scoped>

</style>
