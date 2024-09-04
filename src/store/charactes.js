import { defineStore } from 'pinia';
import { characterMap } from '@/mapping.js';

const API_FIRST_PAGE = 1;
const API_CHARS_PER_PAGE = 10; // Добавляем эту переменную

const TOTAL_CHARS_FALLBACK_VALUE = 100;
export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [],
    totalCharacters: TOTAL_CHARS_FALLBACK_VALUE,
    promisesInProgress: {}
  }),
  getters: {
    getCharacterById: (state) => {
      function getter(charId) {
        const char = state.characters.find((char) => char.id === charId);
        return char;
      }
      return getter;
    },
    getCurrentCharacters: (state) => {
      return (currentPage, charsPerPage) => {
        const startIdx = (currentPage - 1) * charsPerPage;
        return state.characters.slice(startIdx, startIdx + charsPerPage);
      }
  },
  },
  actions: {
    /**
     * Setting 10 characters from API response into the store in a specific place.
     * @param {*} characters 10 characters to set
     * @param {*} page       starting position to insert
     */
    setCharacters(characters, page) {
      if (page < 1) throw new Error('Page cannot be less than 1')
      this.characters = new Array(this.totalCharacters)
        .fill(undefined)
        .map((_, idx)=> this.characters[idx] !== undefined ? {...this.characters[idx]} : undefined)
        .map((value, idx)=>
          idx >= (page - 1) * API_CHARS_PER_PAGE && idx < page * API_CHARS_PER_PAGE
            ? characters[idx % API_CHARS_PER_PAGE]
            : value
          )
    },
    async triggerServerFetch(page, charsPerPage, searchQuery, force = false) {
      if (force) {
        await this.fetchAndSetCharacters(page, searchQuery)
      }

      const pagesToFetch = this.characters
        .map((value, idx)=>
          idx >= (page - 1) * charsPerPage && idx < page * charsPerPage && value === undefined
            ? idx
            : null
          )
        .filter(value => value)
        .reduce((acc, charIdx) =>
          Array.from(new Set([...acc, Math.floor(charIdx / API_CHARS_PER_PAGE + 1)]))
        , [])

      await Promise.all(pagesToFetch.map((pageToFetch)=>this.fetchAndSetCharacters(pageToFetch, searchQuery)))
    },
    async fetchAndSetCharacters(page, searchQuery){
      if (this.promisesInProgress[page]) {
        console.warn('Promise already pending', page)
        return
      }
      this.promisesInProgress = {...this.promisesInProgress, [page]: true}
      const { characters, totalCharacters } = await this.fetchCharacters(page, searchQuery);
      this.promisesInProgress = {...this.promisesInProgress, [page]: false}
      this.totalCharacters = totalCharacters;
      this.setCharacters(characters, page);
    },
    setTotalCharacters(totalCharacters) {
      this.totalCharacters = totalCharacters;
    },
    onLike(id) {
      this.characters = this.characters.map((char) =>
        char.id === id ? { ...char, isLiked: !char.isLiked } : char
      );
    },
    async fetchCharacters(page, search = '') {
      let url = `https://swapi.dev/api/people/?page=${page}&format=json`;
      if (search.length > 0) {
        url += `&search=${search}`;
      }
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          return {
            totalCharacters: data.count ?? TOTAL_CHARS_FALLBACK_VALUE,
            characters: data.results.map(characterMap)
          };
        });
    },
  }
});
