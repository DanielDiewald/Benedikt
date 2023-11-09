import { defineStore } from 'pinia';

export const useChartStore = defineStore('chart', {
  state: () => ({
    MessagesGroup: {
      labels: null,
      datasets: [
        {
          fill: true,
          label: null,
          backgroundColor: null,
          borderColor: null,
          pointBackgroundColor: null,
          pointHighlightStroke: null,
          data: null,
        },
      ],
    },
    color1: ['#4c86af', '#af4c58'],
    color2: ['#5ba2d450', '#c9576450'],
  }),
  actions: {
    async dataanalyse(data) {
      let person = 0;
      const formattedData = {};
      //reset groupchat
      this.MessagesGroup = {
        labels: null,
        datasets: [
          {
            fill: true,
            label: null,
            backgroundColor: null,
            borderColor: null,
            pointBackgroundColor: null,
            pointHighlightStroke: null,
            data: null,
          },
        ],
      };

      //analyse
      for (const sender in data) {
        const messagesData = data[sender];
        const labels = Object.keys(messagesData);
        const messageCounts = Object.values(messagesData);
        let setcolor1 = NaN;
        let setcolor2 = NaN;

        if (person % 2 === 0) {
          setcolor1 = this.color1[1];
          setcolor2 = this.color2[1];
        } else {
          setcolor1 = this.color1[0];
          setcolor2 = this.color2[0];
        }

        const chartData = {
          fill: true,
          label: labels,
          pointBackgroundColor: setcolor1,
          pointHighlightStroke: setcolor1,
          backgroundColor: setcolor2,
          borderColor: setcolor1,
          data: messageCounts,
        };

        this.MessagesGroup.labels = labels;
        this.MessagesGroup.datasets.push(chartData);
      }
    },
  },
});
