import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', {
  state: () => ({ chat: [] }),
  actions: {
    async parseTextFile(text) {
      const regex = /\[(\d{2}.\d{2}.\d{2}, \d{2}:\d{2}:\d{2})\] ([^:]+): (.+)/g;
      const messages = [];

      let match;
      while ((match = regex.exec(text)) !== null) {
        const dateStr = match[1];
        const sender = match[2];
        const message = match[3];

        // Parse the date string into a valid format (e.g., 'MM.DD.YY, HH:MM:SS')
        const parsedDateStr = dateStr.replace(
          /(\d{2}).(\d{2}).(\d{2}), (\d{2}:\d{2}:\d{2})/,
          '20$3-$2-$1 $4'
        );

        // Convert the parsed date string to a Unix timestamp
        const unixTime = new Date(parsedDateStr).getTime();

        messages.push({ unixTime, sender, message });
      }

      this.chat = messages;
    },
  },
});
