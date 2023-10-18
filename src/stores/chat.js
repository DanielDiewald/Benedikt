import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', {
  state: () => ({
    wordscount: null,
    messages: null,
    totalMessages: null,
    uniqueSenders: null,
    MessagesByYearAndMonth: {
      labels: null,
      datasets: [
        {
          label: null,
          backgroundColor: null,
          data: null,
        },
      ],
    },
    MessagesByYearAndMonthExtended: {
      labels: null,
      datasets: [
        {
          label: null,
          backgroundColor: null,
          data: null,
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
      console.log(data);
      console.log(labels);
      this.MessagesByYearAndMonth = {
        labels,
        datasets: [
          {
            label: 'Messages',
            backgroundColor: '#4caf50',
            borderColor: '#8bc34a',
            data,
          },
        ],
      };
    },
    async countMessagesByYearAndMonthExtended(messages) {
      const messageCounts = {};

      for (const message of messages) {
        const date = new Date(message.unixTime);
        const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}`;

        if (!messageCounts[message.sender]) {
          messageCounts[message.sender] = [];
        }

        if (!messageCounts[message.sender][monthYear]) {
          messageCounts[message.sender][monthYear] = 1;
        } else {
          messageCounts[message.sender][monthYear]++;
        }
      }

      const result = [];
      const totalMessagesPerMonth = {};

      // Calculate the total messages per month for all senders
      for (const sender in messageCounts) {
        for (const monthYear in messageCounts[sender]) {
          if (!totalMessagesPerMonth[monthYear]) {
            totalMessagesPerMonth[monthYear] = messageCounts[sender][monthYear];
          } else {
            totalMessagesPerMonth[monthYear] +=
              messageCounts[sender][monthYear];
          }
        }
      }

      result.push({
        sendername: 'Total',
        total: Object.values(totalMessagesPerMonth),
        totalmessages: Object.values(totalMessagesPerMonth).reduce(
          (acc, count) => acc + count,
          0
        ),
      });

      // Create objects for each sender with message counts per month
      for (const sender in messageCounts) {
        const messageCountPerMonth = Object.values(messageCounts[sender]);
        const senderObj = {
          sendername: sender,
          total: messageCountPerMonth,
          totalmessages: messageCountPerMonth.reduce(
            (acc, count) => acc + count,
            0
          ),
        };
        result.push(senderObj);
      }

      // Create an array of month-year values
      const labels = Object.keys(totalMessagesPerMonth);
      const data = Object.values(result[0].total);

      this.MessagesByYearAndMonthExtended = {
        labels,
        datasets: [
          {
            label: 'Messages',
            backgroundColor: '#4caf50',
            borderColor: '#8bc34a',
            data,
          },
          {
            label: result[1].sendername,
            backgroundColor: '#4c86af',
            borderColor: '#8bc34a00',
            data: Object.values(result[1].total),
          },
          {
            label: result[2].sendername,
            backgroundColor: '#af4c58',
            borderColor: '#8bc34a00',
            data: Object.values(result[2].total),
          },
        ],
      };
    },
    async extractWordsFromMessages(messageArray) {
      const allWords = [];

      messageArray.forEach((messageObj) => {
        if (messageObj.message && typeof messageObj.message === 'string') {
          // Split the message into words using spaces, and also consider other common punctuation marks
          const words = messageObj.message.split(/\s+|\W+/);

          // Filter out empty strings and add the words to the allWords array
          allWords.push(...words.filter((word) => word.trim() !== ''));
        }
      });
      this.wordscount = allWords.length;
    },
  },
});
