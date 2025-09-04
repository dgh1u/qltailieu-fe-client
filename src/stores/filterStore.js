import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', {
    state: () => ({
        activeFilter: {
            type: null,
            value: null
        }
    }),

    actions: {
        setFilter(type, value) {
            this.activeFilter = { type, value }
        },
        clearFilter() {
            this.activeFilter = { type: null, value: null }
        }
    }
})