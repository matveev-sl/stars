import { defineStore } from 'pinia';
import { characterMap } from '@/mapping.js';

const API_FIRST_PAGE = 1;
const API_CHARS_PER_PAGE = 10; // Добавляем эту переменную

const TOTAL_CHARS_FALLBACK_VALUE = 100;
export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [],
    isLoading: false,
    error: '',
    totalCharacters: TOTAL_CHARS_FALLBACK_VALUE
  }),
  actions: {
    setCharacters(characters) {
      this.characters = characters;
    },
    setTotalCharacters(totalCharacters) {
      this.totalCharacters = totalCharacters;
    },
    getCurrentCharacters(currentPage, charsPerPage) {
      const startIdx = (currentPage - 1) * charsPerPage;
      return this.characters.slice(startIdx, startIdx + charsPerPage);
    },
    onLike(id) {
      this.characters = this.characters.map(char => char.id === id
        ? { ...char, isLiked: !char.isLiked }
        : char
      );
    },
    async fetchCharacters(page, search = '') {
      let url = `https://swapi.dev/api/people/?page=${page}&format=json`;
      if (search.length > 0) {
        url += `&search=${search}`;
      }
      return fetch(url)
        .then(response => response.json())
        .then(data => {
          return {
            totalCharacters: data.count ?? TOTAL_CHARS_FALLBACK_VALUE,
            characters: data.results.map(characterMap)
          };
        })
        .catch((e) => {
          console.error('Произошла ошибка', e);
          this.error = 'Серверная ошибка';
        });
    },
    async checkCharactersPerPageLimit(page, limit, searchQuery) {
      if (this.getCurrentCharacters(page, limit).length >= limit * page) {
        return;
      }
      this.isLoading = true;
      const startPage = Math.ceil(this.characters.length / API_CHARS_PER_PAGE) + API_FIRST_PAGE;
      const finalPage = Math.ceil(page * limit / API_CHARS_PER_PAGE);
      try {
        for (let p = startPage; p <= finalPage; p++) {
          const { characters, totalCharacters } = await this.fetchCharacters(p, searchQuery);
          this.setCharacters([ ...this.characters, ...characters ]);
          this.totalCharacters = totalCharacters;
        }
      } catch (error) {
        console.error('Ошибка при загрузке персонажей:', error);
        this.error = 'Ошибка при загрузке данных';
      } finally {
        this.isLoading = false;
      }
    }
  }
});
