import { defineStore } from 'pinia';

export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: []
  }),
  actions: {
    setCharacters(characters) {
      this.characters = characters;
    },
    getCurrentCharacters(currentPage, charsPerPage) {
      const startIdx = (currentPage - 1) * charsPerPage;
      // Возвращаем 10 персонажей
      return this.characters.slice(startIdx, startIdx + charsPerPage);
    }
  }
});
