import { defineStore } from 'pinia';
import axios from 'axios';
import type { Function } from '@/types/workflow';

export const useFunctionsStore = defineStore('functions', {
  state: () => ({
    functions: [] as Function[],
  }),
  getters: {
    
  },
  actions: {
    async fetchFunctions():Promise<Function[]> {
      const {data} = await axios.get('/v1/functions')
      this.functions = data?.data as Function[]
      return data?.data as Function[]
    },
  }
});