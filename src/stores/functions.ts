import { defineStore } from 'pinia';
import axios from 'axios';

export const useFunctionsStore = defineStore('functions', {
  state: () => ({
    functions: [],
  }),
  getters: {
    
  },
  actions: {
    async fetchFunctions() {
      const {data} = await axios.get('/v1/functions')
      console.log({data})
    },
  }
});