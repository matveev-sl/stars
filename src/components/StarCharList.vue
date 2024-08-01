<template>
  <v-container>
    <div v-if="isLoading">Загружается...</div>
    <div v-else-if="error">{{error}}</div>
    <div v-else>
      <v-list>
          <v-list-item v-for="(char, index) in currentCharacters" :key="index">
            <v-list-item-content>
              <v-list-item-title>{{ char.name }}</v-list-item-title>
              <v-list-item-subtitle>Height: {{ char.height }}</v-list-item-subtitle>
              <v-list-item-subtitle>Mass: {{ char.mass }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </div>
    <v-btn @click="previousPage">Previous</v-btn>
    <v-btn @click="nextPage">Next</v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      error: '',
      currentPage: 1,
      characters: [],
    }
  },
  async mounted() {
      this.characters = await this.fetchCharacters(1)
  },
  computed: {
    currentCharacters(){
      const startIdx = (this.currentPage-1) * 10
      return this.characters.slice(startIdx, startIdx +9)
    }
  },
  methods: {
    fetchCharacters(page){
      this.isLoading = true;
      return fetch(`https://swapi.dev/api/people/?page=${page}&format=json`)
        .then(response => response.json())
        .then(data => {
          return data.results
        })
        .catch((e)=> {
          console.error("Error happened", e);
          this.error = "Серверная ошибка";
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async nextPage() {
      if(this.characters.length !== this.currentPage * 10){
        // alert('Your logic is failed')
        this.currentPage++
        return
      }
      this.currentPage++
      const newCharacters = await this.fetchCharacters(this.currentPage)
      this.characters = [...this.characters, ...newCharacters]
    },
    previousPage() {
      if (this.currentPage===1) {
        return
      }
      this.currentPage--
      console.log('previousPage', this.currentPage)
    },
  }  };
</script>
