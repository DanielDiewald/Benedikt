import { defineStore } from 'pinia';

export const useChatCountStore = defineStore('count', {
  actions: {
    PerMonth(messages) {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;

      // Creating an object to store messages per sender per month
      const result = {};

      // Find the earliest message date
      const earliestDate = new Date(
        Math.min(...messages.map((message) => message.unixTime))
      );

      // Loop through each message
      messages.forEach((message) => {
        const date = new Date(message.unixTime);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        // Calculating the monthKey (YYYY-MM)
        const monthKey = `${year}-${month.toString().padStart(2, '0')}`;

        if (!result[message.sender]) {
          result[message.sender] = {};
        }

        // Filling in empty months with NaN for each sender
        for (let y = earliestDate.getFullYear(); y <= currentYear; y++) {
          const lastMonth = y === currentYear ? currentMonth : 12;
          const startMonth =
            y === earliestDate.getFullYear() ? earliestDate.getMonth() + 1 : 1;

          for (let m = startMonth; m <= lastMonth; m++) {
            const key = `${y}-${m.toString().padStart(2, '0')}`;

            if (!result[message.sender][key]) {
              result[message.sender][key] = 0;
            }
          }
        }

        // Incrementing the message count for the respective month and sender
        result[message.sender][monthKey]++;
      });

      // Sort data by month
      Object.keys(result).forEach((sender) => {
        const sorted = Object.entries(result[sender]).sort(
          ([monthA], [monthB]) => {
            const [yearA, monthNumA] = monthA.split('-').map(Number);
            const [yearB, monthNumB] = monthB.split('-').map(Number);
            return yearA - yearB || monthNumA - monthNumB;
          }
        );
      });
      // Replace 0 with NaN for each sender
      Object.keys(result).forEach((sender) => {
        Object.keys(result[sender]).forEach((month) => {
          if (result[sender][month] === 0) {
            result[sender][month] = NaN;
          }
        });
      });

      return result;
    },
    PerDay(messages) {
      const result = {};

      messages.forEach((message) => {
        const date = new Date(message.unixTime);
        const dayKey = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        const sender = message.sender;

        if (!result[sender]) {
          result[sender] = {};
        }

        if (!result[sender][dayKey]) {
          result[sender][dayKey] = 0;
        }

        result[sender][dayKey]++;
      });

      // Fill in empty days with NaN
      const senders = Object.keys(result);
      const daysSet = new Set();

      senders.forEach((sender) => {
        const days = Object.keys(result[sender]);
        days.forEach((day) => {
          daysSet.add(day);
        });
      });

      const allDays = Array.from(daysSet).sort();

      senders.forEach((sender) => {
        allDays.forEach((day) => {
          if (!result[sender][day]) {
            result[sender][day] = NaN;
          }
        });
      });

      return result;
    },
  },
});
