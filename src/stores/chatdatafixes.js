import { defineStore } from 'pinia';

export const useChatDataFixesStore = defineStore('chatfixes', {
  state: () => ({ test: null }),
  actions: {
    getMonthsBetween(startMonth, endMonth) {
      const startDate = new Date(startMonth + '-01');
      const endDate = new Date(endMonth + '-01');
      const months = [];
      while (startDate <= endDate) {
        const year = startDate.getFullYear();
        const month = startDate.getMonth() + 1;
        months.push(`${year}-${month.toString().padStart(2, '0')}`);
        startDate.setMonth(startDate.getMonth() + 1);
      }
      return months;
    },
  },
});
