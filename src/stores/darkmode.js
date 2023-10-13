import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useModeStore = defineStore('mode', {
  state: () => {
    return {
      darkmode: useLocalStorage('darkmode', false)
    };
  },
});
