import { defineStore } from 'pinia';
import { Character, characterMap } from '@/mapping';
import { API_CHARS_PER_PAGE, API_FIRST_PAGE, BASE_API_URL } from '@/config';

type State = {
  character: Character | undefined;
  characters : Character[];
  totalCharacters : number;
  likesIds: number[];
}

const TOTAL_CHARS_FALLBACK_VALUE = 100;

export const useCharactersStore = defineStore('characters', {
  state: (): State => ({
    character: undefined,
    characters: [] as Character[],
    likesIds: [],
    totalCharacters: TOTAL_CHARS_FALLBACK_VALUE,
    promisesInProgress: {}
  }),
  getters: {
    getCharacterById: (state: State) : (charId : number) => Character | undefined => {
      return (charId: number) => state.character?.id === charId
        ? state.character
        : state.characters.find((char) => char.id === charId);
    },
    getIsLiked: (state: State): (id: number) => boolean => {
      return (charId: number) => state.likesIds.includes(charId);
    },
    getCurrentCharacters: (state) => {
      return (currentPage, charsPerPage) => {
        const startIdx = (currentPage - 1) * charsPerPage;
        return state.characters.slice(startIdx, startIdx + charsPerPage);
      };
    }
  },
  actions: {
    // setCharacters(characters: Character[]): void {
    //   this.characters = characters;
    // },
    setCharacters(characters, page) {
      if (page < 1) throw new Error('Page cannot be less than 1');
      this.characters = new Array(this.totalCharacters)
        .fill(undefined)
        .map((_, idx) => this.characters[idx] !== undefined ? { ...this.characters[idx] } : undefined)
        .map((value, idx) =>
          idx >= (page - 1) * API_CHARS_PER_PAGE && idx < page * API_CHARS_PER_PAGE
            ? characters[idx % API_CHARS_PER_PAGE]
            : value
        );
    },
    async triggerServerFetch(page, charsPerPage, searchQuery, force = false) {
      if (force) {
        await this.fetchAndSetCharacters(page, searchQuery);
      }

      const pagesToFetch = this.characters
        .map((value, idx) =>
          idx >= (page - 1) * charsPerPage && idx < page * charsPerPage && value === undefined
            ? idx
            : null
        )
        .filter(value => value)
        .reduce((acc, charIdx) =>
          Array.from(new Set([ ...acc, Math.floor(charIdx / API_CHARS_PER_PAGE + 1) ]))
        , []);

      await Promise.all(pagesToFetch.map((pageToFetch) => this.fetchAndSetCharacters(pageToFetch, searchQuery)));
    },
    async fetchAndSetCharacters(page, searchQuery) {
      if (this.promisesInProgress[page]) {
        console.warn('Promise already pending', page);
        return;
      }
      this.promisesInProgress = { ...this.promisesInProgress, [page]: true };
      const { characters, totalCharacters } = await this.fetchCharacters(page, searchQuery);
      this.promisesInProgress = { ...this.promisesInProgress, [page]: false };
      this.totalCharacters = totalCharacters;
      this.setCharacters(characters, page);
    },
    setTotalCharacters(totalCharacters: number): void {
      this.totalCharacters = totalCharacters;
    },
    setLikedIds(likedIds: number[]): void {
      this.likesIds = likedIds;
    },
    onLike(id: number): void {
      this.likesIds = [ ...this.likesIds, id ];
      localStorage.setItem('likedIds', JSON.stringify(this.likesIds));
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
        characters: data.results.map(characterMap)
      };
    },
    async fetCharacter(id: number): Promise<Character> {
      const url = `${BASE_API_URL}people/${id}/?format=json`;
      const response = await fetch(url);
      const data = await response.json();
      return characterMap(data);
    },
    async checkCharacter(id: number): Promise<void> {
      if (this.getCharacterById(id)) return;
      this.character = await this.fetCharacter(id);
    }
  }
});
