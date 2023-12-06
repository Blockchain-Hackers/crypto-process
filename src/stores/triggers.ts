import { defineStore } from 'pinia';
import axios from 'axios';
import type { Trigger } from '@/types/workflow';

export const useTriggerStore = defineStore('trigger', {
  state: () => ({
    triggers: [] as Trigger[],
  }),
  getters: {
    
  },
  actions: {
    async fetchTriggers(): Promise<Trigger[]> {
      const {data} = await axios.get('/v1/triggers')
      this.triggers = data?.data as Trigger[]
      return data?.data as Trigger[]
    },
  }
});