import { defineStore } from 'pinia';
import axios from 'axios';

export const useTriggerStore = defineStore('trigger', {
  state: () => ({
    triggers: [],
  }),
  getters: {
    
  },
  actions: {
    async fetchTriggers() {
      const {data} = await axios.get('/v1/triggers')
      console.log({data})
    },
  }
});