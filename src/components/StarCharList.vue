<template>
  <v-container>
    <!-- Проверка, идет ли загрузка данных -->
    <div v-if="isLoading">Загружается...</div>
    <!-- Проверка, есть ли ошибка -->
    <div v-else-if="error">{{ error }}</div>
    <!-- Если нет загрузки и ошибки, отображается список персонажей -->
    <div v-else>
      <v-list>
        <!-- Проход по каждому персонажу в currentCharacters и отображение его данных через CharacterCard -->
        <CharacterCard v-for="(char, index) in currentCharacters" :key="index" :character="char" />
      </v-list>
     
    </div>
    <!-- Кнопка для перехода на предыдущую страницу -->
    <v-btn @click="previousPage" :disabled="isButtonDisabledPrev">Previous</v-btn>
    <!-- Кнопка для перехода на следующую страницу -->
    <v-btn @click="nextPage" :disabled="isButtonDisabledNext">Next</v-btn>
  </v-container>
</template>

<script>
import CharacterCard from './CharacterCard.vue'

export default {
  components: {
    CharacterCard 
  },
  data() {
    return {
      isLoading: false,   // Инициализация состояния загрузки как false
      error: '',          // Инициализация сообщения об ошибке как пустая строка
      currentPage: 1,     // Инициализация текущей страницы как 1
      characters: [],     // Инициализация массива персонажей как пустого
      isButtonDisabledNext: false,
      isButtonDisabledPrev: false
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
      this.disablePrevButton()
      return this.characters.slice(startIdx, startIdx + 10) // Возвращаем 10 персонажей
      
    }
  },
 
 watch: {
  currentPage() {
  this.disablePrevButton()
  this.disableNextButton()
  },

 },

  methods: {
    // Метод для получения персонажей с определенной страницы
    fetchCharacters(page) {
      this.isLoading = true; // Устанавливаем состояние загрузки в true
      return fetch(`https://swapi.dev/api/people/?page=${page}&format=json`) // Выполняем запрос к API
        .then(response => response.json()) // Парсим ответ как JSON
        .then(data => {
          return data.results // Возвращаем результаты запроса
        })
        .catch((e) => {
          console.error("Произошла ошибка", e); // Логируем ошибку в консоль
          this.error = "Серверная ошибка"; // Устанавливаем сообщение об ошибке
        })
        .finally(() => {
          this.isLoading = false; // Сбрасываем состояние загрузки
        });
    },
    // Метод для перехода на следующую страницу
    async nextPage() {
      if (this.characters.length !== this.currentPage * 10) {
        // Если количество персонажей не соответствует текущей странице, увеличиваем страницу и выходим из функции
        this.currentPage++
       
        return
      }
     
      this.currentPage++ // Увеличиваем текущую страницу
      const newCharacters = await this.fetchCharacters(this.currentPage) // Получаем новых персонажей для новой страницы
      this.characters = [...this.characters, ...newCharacters] // Обновляем массив персонажей новыми данными
      
    },
    // Метод для перехода на предыдущую страницу
    previousPage() {
      if (this.currentPage === 1) {
      return // Если текущая страница первая, выходим из функции
      }
      this.currentPage-- // Уменьшаем текущую страницу
      console.log('previousPage', this.currentPage) // Логируем номер предыдущей страницы
    },
    disablePrevButton () {
     if (this.currentPage === 1) {
        this.isButtonDisabledPrev = true;
     }
     else {this.isButtonDisabledPrev = false;}
    },
    disableNextButton () {
      if (this.currentPage >8) {
        this.isButtonDisabledNext = true;
     }
     else {this.isButtonDisabledNext = false;}
    }
    }
  }

</script>
