import { defineStore } from 'pinia';
import { Character, characterMap } from '@/mapping';
import { API_CHARS_PER_PAGE, API_FIRST_PAGE, BASE_API_URL } from '@/config';

const TOTAL_CHARS_FALLBACK_VALUE = 100;
export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [] as Character[],
    totalCharacters: TOTAL_CHARS_FALLBACK_VALUE
  }),
  getters: {

    getCharacterById: (state) => {
      function getter(charId: number) {
        const char = state.characters.find((char) => char.id === charId);
        return char;
      }
      return getter;
    },
    getLikedIds: (state) => {
      return state.characters.filter(item => item.isLiked).map(item => item.id);
    }
  },
  actions: {
    setCharacters(characters: Character[]) {
      this.characters = characters;
    },
    setTotalCharacters(totalCharacters): void {
      this.totalCharacters = totalCharacters;
    },
    getCurrentCharacters(currentPage, charsPerPage) {
      const startIdx = (currentPage - 1) * charsPerPage;
      return this.characters.slice(startIdx, startIdx + charsPerPage);
    },
    onLike(id) {
      // const isLiked = this.likedIds.includes(id);
      // if (isLiked) {
      //   this.likedIds = this.likedIds.filter(likedId => likedId !== id);
      // } else {
      //   this.likedIds.push(id);
      // }
      // localStorage.setItem('likedIds', JSON.stringify(this.likedIds));

      this.characters = this.characters.map((char) =>
        char.id === id ? { ...char, isLiked: !char.isLiked } : char
      );
    },
    async fetchCharacters(page, search = '') {
      let url = `${BASE_API_URL}people/?page=${page}&format=json`;
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
    async checkCharactersPerPageLimit(page, limit, searchQuery) {
      if (this.getCurrentCharacters(page, limit).length >= limit * page) {
        return undefined;
      }
      try {
        const startPage = Math.ceil(this.characters.length / API_CHARS_PER_PAGE) + API_FIRST_PAGE;
        const finalPage = Math.ceil(page * limit / API_CHARS_PER_PAGE);

        for (let p = startPage; p <= finalPage; p++) {
          const { characters, totalCharacters } = await this.fetchCharacters(p, searchQuery);
          this.setCharacters([ ...this.characters, ...characters ]);
          this.totalCharacters = totalCharacters;
        }
        return undefined;
      } catch (error) {
        console.error ('Ошибка пейдж лимит', error);
        throw error;
      }

    }
  }
});
