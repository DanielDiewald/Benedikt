import { defineStore } from 'pinia';

export const useChatCountStore = defineStore('count', {
  actions: {
    PerMonth(messages) {
      const result = {};

      messages.forEach((message) => {
        const date = new Date(message.unixTime);
        const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}`;
        const sender = message.sender;

        if (!result[sender]) {
          result[sender] = {};
        }

        if (!result[sender][monthKey]) {
          result[sender][monthKey] = 0;
        }

        result[sender][monthKey]++;
      });

      // Fill in empty months with NaN
      const senders = Object.keys(result);
      const monthsSet = new Set();

      senders.forEach((sender) => {
        const months = Object.keys(result[sender]);
        months.forEach((month) => {
          monthsSet.add(month);
        });
      });

      const allMonths = Array.from(monthsSet).sort();

      senders.forEach((sender) => {
        allMonths.forEach((month) => {
          if (!result[sender][month]) {
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
