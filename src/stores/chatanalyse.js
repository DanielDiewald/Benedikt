import { defineStore } from 'pinia';

export const useChatAnalyseStore = defineStore('cas', {
  state: () => ({
    messages: null,
    totalMessages: null,
    senders: [],
    words: null,
    images: null,
    videos: null,
    audios: null,
  }),
  actions: {
    countOmittedMessages(messages) {
      // Initialize a variable to store the count of messages with "image omitted"
      let imageOmittedCount = 0;
      let videoOmittedCount = 0;
      let audioOmittedCount = 0;

      // Iterate through the array of messages
      messages.forEach((message) => {
        // Check if the message contains the text "image omitted"
        if (message.message.includes('image omitted')) {
          imageOmittedCount++;
        }
        if (message.message.includes('video omitted')) {
          videoOmittedCount++;
        }
        if (message.message.includes('audio omitted')) {
          audioOmittedCount++;
        }
      });

      // Return the count of messages with "image omitted"
      return (
        (this.images = imageOmittedCount),
        (this.videos = videoOmittedCount),
        (this.audios = audioOmittedCount)
      );
    },
    countWords(messages) {
      // Initialize a variable to store the total word count
      let totalWords = 0;

      // Iterate through the array of messages
      messages.forEach((message) => {
        // Use regex to split the message into words and count them
        const words = message.message.split(/\s+/);
        totalWords += words.length;
      });

      // Return the total word count
      return (this.words = totalWords);
    },
    getUniqueSenders(messages) {
      // Create an empty Set to store unique senders
      let uniqueSenders = new Set();

      // Iterate through the array of messages and add each sender to the Set
      messages.forEach((message) => {
        uniqueSenders.add(message.sender);
      });

      // Convert the Set back to an array and return it
      return (this.senders = Array.from(uniqueSenders));
    },
    async ios(text) {
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
    async android(text) {
      const regex = /(\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}) - ([^:]+): (.+)/g;
      const messages = [];

      let match;
      while ((match = regex.exec(text)) !== null) {
        const dateStr = match[1];
        const sender = match[2];
        const message = match[3];

        // Parse the date string into a valid format (e.g., 'MM/DD/YYYY, HH:MM')
        const parsedDateStr = dateStr.replace(
          /(\d{2})\/(\d{2})\/(\d{4}), (\d{2}:\d{2})/,
          '$3-$2-$1 $4'
        );

        // Convert the parsed date string to a Unix timestamp
        const unixTime = new Date(parsedDateStr).getTime();

        messages.push({ unixTime, sender, message });
      }

      this.messages = messages;
      this.totalMessages = messages.length;
    },
  },
});
