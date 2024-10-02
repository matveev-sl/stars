import { defineStore } from 'pinia';
import { Character, characterMap } from '@/mapping';
import { API_CHARS_PER_PAGE, API_FIRST_PAGE, BASE_API_URL } from '@/config';

const TOTAL_CHARS_FALLBACK_VALUE = 100;

export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [] as Character[],
    totalCharacters: TOTAL_CHARS_FALLBACK_VALUE,
  }),
  getters: {
    getCharacterById: (state) => {
      return (charId: number) => state.characters.find((char) => char.id === charId);
    },
    getLikedIds: (state) => {
      return state.characters.filter((item) => item.isLiked).map((item) => item.id);
    },
  },
  actions: {
    setCharacters(characters: Character[]): void {
      this.characters = characters;
    },
    setTotalCharacters(totalCharacters: number): void {
      this.totalCharacters = totalCharacters;
    },
    setLikedIds(likedIds: number[]): void {
      this.characters = this.characters.map((char: any) => ({
        ...char,
        isLiked: likedIds.includes(char.id), 
      }));
    },
    getCurrentCharacters(currentPage: number, charsPerPage: number): Character[] {
      const startIdx = (currentPage - 1) * charsPerPage;
      return this.characters.slice(startIdx, startIdx + charsPerPage);
    },
    onLike(id: number): void {
      this.characters = this.characters.map((char) =>
        char.id === id ? { ...char, isLiked: !char.isLiked } : char
      );
      // Optional: store liked characters in localStorage
      const likedIds = this.getLikedIds;
      localStorage.setItem('likedIds', JSON.stringify(likedIds));
    },
    async fetchCharacters(page: number, search = ''): Promise<{ characters: Character[]; totalCharacters: number }> {
      let url = `${BASE_API_URL}people/?page=${page}&format=json`;
      if (search) {
        url += `&search=${search}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      return {
        totalCharacters: data.count ?? TOTAL_CHARS_FALLBACK_VALUE,
        characters: data.results.map(characterMap),
      };
    },
    async checkCharactersPerPageLimit(page: number, limit: number, searchQuery = ''): Promise<void> {
      if (this.getCurrentCharacters(page, limit).length >= limit * page) {
        return;
      }

      try {
        const startPage = Math.ceil(this.characters.length / API_CHARS_PER_PAGE) + API_FIRST_PAGE;
        const finalPage = Math.ceil((page * limit) / API_CHARS_PER_PAGE);

        for (let p = startPage; p <= finalPage; p++) {
          const { characters, totalCharacters } = await this.fetchCharacters(p, searchQuery);
          this.setCharacters([...this.characters, ...characters]);
          this.setTotalCharacters(totalCharacters);
        }
      } catch (error) {
        console.error('Ошибка при загрузке страниц', error);
        throw error;
      }
    },
  },
});
