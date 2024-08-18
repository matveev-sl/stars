import { defineStore } from 'pinia'

export const useCharacterDetailStore = defineStore('character-detail', {
    state: () => ({
        characterDetail: {}
    }),
    actions: {
        setCharacterDetail(characterDetail) {
            this.characterDetail = characterDetail
        },
    },
})