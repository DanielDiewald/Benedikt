import { defineStore } from 'pinia';

export const useChatSendersStore = defineStore('chat', {
  state: () => ({ uniqueSenders: null }),
  actions: {
    async countUniqueSenders(text) {
      const uniqueSenders = new Set();

      text.forEach((message) => {
        uniqueSenders.add(message.sender);
      });

      this.uniqueSenders = uniqueSenders.size;
    },
  },
});
