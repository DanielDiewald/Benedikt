import { defineStore } from 'pinia';

export const useChartStore = defineStore('chart', {
  state: () => ({
    tocalcount: [],
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
    MessagesGroupChart1: {
      labels: null,
      datasets: [
        {
          label: null,
          backgroundColor: null,
          borderColor: null,
          pointBackgroundColor: null,
          pointHighlightStroke: null,
          data: null,
        },
      ],
    },
    Person1: {
      labels: null,
      datasets: [
        {
          label: null,
          backgroundColor: null,
          data: null,
        },
      ],
    },
    Person2: {
      labels: null,
      datasets: [
        {
          label: null,
          backgroundColor: null,
          data: null,
        },
      ],
    },
    Total: {
      labels: null,
      datasets: [
        {
          label: null,
          backgroundColor: null,
          data: null,
        },
      ],
    },
    color1: ['#4c86af', '#af4c58'],
    color2: ['#5ba2d450', '#c9576450'],
  }),
  actions: {
    sumArrays(arr1, arr2) {
      const result = [];

      // Check if both arrays have the same length
      if (arr1.length !== arr2.length) {
        return 'Arrays should have the same length';
      }

      for (let i = 0; i < arr1.length; i++) {
        result.push(arr1[i] + arr2[i]);
      }

      return result;
    },
    async dataanalyseprivatechat(data) {
      let personcount = 0;
      let messages1 = [];
      for (const sender in data) {
        console.log(sender);
        const messagesData = data[sender];
        const labels = Object.keys(messagesData);
        const messageCounts = Object.values(messagesData);
        this.MessagesGroupChart1.labels = labels;
        if (personcount == 0) {
          messages1 = messageCounts;
          this.MessagesGroupChart1.datasets.push({
            label: sender,
            data: messageCounts,

            backgroundColor: '#af4c58',
            borderColor: '#c95764',
          });

          this.Person2 = {
            labels,
            datasets: [
              {
                label: sender,
                data: messageCounts,

                backgroundColor: '#af4c58',
                borderColor: '#c95764',
              },
            ],
          };
        }
        if (personcount == 1) {
          const total = this.sumArrays(messages1, messageCounts);
          this.MessagesGroupChart1.datasets.push({
            label: 'total messages',
            data: total,

            backgroundColor: '#4caf50',
            borderColor: '#8bc34a',
          });
          this.MessagesGroupChart1.datasets.push({
            label: sender,
            data: messageCounts,

            backgroundColor: '#4c86af',
            borderColor: '#5ba2d4',
          });
          this.Person1 = {
            labels,
            datasets: [
              {
                label: sender,
                data: messageCounts,

                backgroundColor: '#4c86af',
                borderColor: '#5ba2d4',
              },
            ],
          };
        }
        personcount = personcount + 1;
      }
    },
    async dataanalyse(data) {
      let personcount = 2;
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
        console.log(sender);
        const messagesData = data[sender];
        const labels = Object.keys(messagesData);
        const messageCounts = Object.values(messagesData);
        let setcolor1 = NaN;
        let setcolor2 = NaN;

        if (personcount % 2 === 0) {
          setcolor1 = this.color1[1];
          setcolor2 = this.color2[1];
        } else {
          setcolor1 = this.color1[0];
          setcolor2 = this.color2[0];
        }

        const chartData = {
          fill: true,
          label: sender,
          pointBackgroundColor: setcolor1,
          pointHighlightStroke: setcolor1,
          backgroundColor: setcolor2,
          borderColor: setcolor1,
          data: messageCounts,
        };

        this.MessagesGroup.labels = labels;
        this.MessagesGroup.datasets.push(chartData);
        personcount++;
      }
    },
  },
});
