import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: null,
    totalMessages: null,
    uniqueSenders: null,
    MessagesByYearAndMonth: {
      labels: ['January', 'February', 'March'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20, 12],
        },
      ],
    },
  }),
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

      this.messages = messages;
      this.totalMessages = messages.length;
    },
    async countUniqueSenders(text) {
      const uniqueSenders = new Set();

      text.forEach((message) => {
        uniqueSenders.add(message.sender);
      });

      this.uniqueSenders = uniqueSenders.size;
    },
    async countMessagesByYearAndMonth(messageData) {
      const messageCounts = {};

      for (const message of messageData) {
        const unixTime = message.unixTime;
        const date = new Date(unixTime);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });

        // Create a unique key for year and month combination
        const yearMonthKey = `${year} ${month}`;

        if (!messageCounts[yearMonthKey]) {
          messageCounts[yearMonthKey] = 0;
        }

        messageCounts[yearMonthKey]++;
      }

      const labels = Object.keys(messageCounts);
      const data = Object.values(messageCounts);

      this.MessagesByYearAndMonth = {
        labels,
        datasets: [
          {
            label: 'Messages',
            backgroundColor: '#4caf50',
            data,
          },
        ],
      };
    },
  },
});
