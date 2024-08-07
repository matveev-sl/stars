<template>
  <v-container>
    <!-- Проверка, идет ли загрузка данных -->
    <div v-if="isLoading">Загружается...</div>
    <!-- Проверка, есть ли ошибка -->
    <div v-if="error">{{ error }}</div>
    <!-- Если нет загрузки и ошибки, отображается список персонажей -->
    <div v-else>
      <v-list>
        <!-- Проход по каждому персонажу в currentCharacters и отображение его данных через CharacterCard -->
        <CharacterCard v-for="(char, index) in currentCharacters" :key="index" :character="char" />
      </v-list>

    </div>
    <!-- Кнопка для перехода на предыдущую страницу -->
    <v-btn @click="previousPage"  :disabled="isPrevButtonDisabled">Previous</v-btn>

   
    <!-- Кнопка для перехода на следующую страницу -->
    <v-btn @click="nextButtonPage"  :disabled="isNextButtonDisabled">Next</v-btn>
    <v-progress-circular v-if="isLoading" model-value="20" :width="5" indeterminate></v-progress-circular>

    <template v-slot:loader>
        <span class="custom-loader">
          <v-progress-circular
            indeterminate
            color="white"
            size="23"
          ></v-progress-circular>
        </span>
      </template>
  </v-container>
</template>

<script>
// const CHARACTERS_PER_PAGE = 6;
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
    }
  },

  async mounted() {
    // Загружаем персонажей для первой страницы при монтировании компонента
    this.characters = await this.fetchCharacters(1)
    // Вызов метода для отключения кнопки "предыдущая"
  },

  computed: {
    // Вычисляемые данные для текущих персонажей на основе текущей страницы
    currentCharacters() {
      const startIdx = (this.currentPage - 1) * 10 // Начальный индекс для текущей страницы
      console.log(this.currentPage)
      return this.characters.slice(startIdx, startIdx + 10) // Возвращаем 10 персонажей
    },
    isNextButtonDisabled() {
      return this.currentPage > 8
    },
    isPrevButtonDisabled() {
      return this.currentPage <= 1
    }
  },

  methods: {
    // Метод для получения персонажей с определенной страницы
    fetchCharacters(page) {
      this.isLoading = true; // Устанавливаем состояние загрузки в true
      return fetch(`https://swapi.dev/api/people/?page=${page}&format=json`) // Выполняем запрос к API
      .then(response => response.json()) // Парсим ответ как JSON
      .then(data => {
        return data.results.map(characterMap) // Возвращаем результаты запроса
      })
      .catch((e) => {
        console.error("Произошла ошибка", e); // Логируем ошибку в консоль
        this.error = "Серверная ошибка"; // Устанавливаем сообщение об ошибке
      })
      .finally(() => {
        this.isLoading = false; // Сбрасываем состояние загрузки
      });
      
    },
    handleClick() {
      this.loading = true;
      // Симулируем асинхронную операцию, например, запрос к серверу
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    // onLike(id){
    //   const char = this.characters.find(id)
    //   char.isLiked = true
    //   this.characters = "0"
    // },
    // Метод для перехода на следующую страницу
    async nextPage() {
      if (this.characters.length !== this.currentPage * 10) {
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
    nextButtonPage () {
    this.nextPage()
    this.handleClick ()

    },
    // Метод для перехода на предыдущую страницу
    previousPage() {
      if (this.currentPage === 1) {
        return // Если текущая страница первая, выходим из функции
      }
      this.currentPage-- // Уменьшаем текущую страницу
      console.log('previousPage', this.currentPage) // Логируем номер предыдущей страницы
    },
  },
}

</script>
<style scoped>

</style>