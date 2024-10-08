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
    totalCharacters: TOTAL_CHARS_FALLBACK_VALUE
  }),
  getters: {
    getCharacterById: (state: State) : (charId : number) => Character | undefined => {
      return (charId: number) => state.character?.id === charId
        ? state.character
        : state.characters.find((char) => char.id === charId);
    },
    getIsLiked: (state: State): (id: number) => boolean => {
      return (charId: number) => state.likesIds.includes(charId);
    }
  },
  actions: {
    setCharacters(characters: Character[]): void {
      this.characters = characters;
    },
    setTotalCharacters(totalCharacters: number): void {
      this.totalCharacters = totalCharacters;
    },
    setLikedIds(likedIds: number[]): void {
      this.likesIds = likedIds;
    },
    getCurrentCharacters(currentPage: number, charsPerPage: number): Character[] {
      const startIdx = (currentPage - 1) * charsPerPage;
      return this.characters.slice(startIdx, startIdx + charsPerPage);
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
    },
    async checkCharactersPerPageLimit(page: number, limit: number, searchQuery : string = ''): Promise<void> {
      if (this.getCurrentCharacters(page, limit).length >= limit * page) {
        return;
      }

      try {
        const startPage = Math.ceil(this.characters.length / API_CHARS_PER_PAGE) + API_FIRST_PAGE;
        const finalPage = Math.ceil((page * limit) / API_CHARS_PER_PAGE);

        for (let p = startPage; p <= finalPage; p++) {
          const { characters, totalCharacters } = await this.fetchCharacters(p, searchQuery);
          this.setCharacters([ ...this.characters, ...characters ]);
          this.setTotalCharacters(totalCharacters);
        }
      } catch (error) {
        console.error('Ошибка при загрузке страниц', error);
        throw error;
      }
    }
  }
});
