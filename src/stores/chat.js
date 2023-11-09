import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', {
  state: () => ({
    labels: null,
    wordscount: null,
    messages: null,
    totalMessages: null,
    avargeMessages: null,
    totalMessagesPerson1: null,
    avargeMessagesPerson1: null,
    totalMessagesPerson2: null,
    avargeMessagesPerson2: null,
    uniqueSenders: null,
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
    MessagesByYearAndMonthPerson1: {
      labels: null,
      datasets: [
        {
          label: null,
          backgroundColor: null,
          data: null,
        },
      ],
    },
    MessagesByYearAndMonthPerson2: {
      labels: null,
      datasets: [
        {
          label: null,
          backgroundColor: null,
          data: null,
        },
      ],
    },
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
    mergeAndSumArrays(arr1, arr2) {
      const resultObj = {};

      for (let i = 0; i < arr2.length; i++) {
        const month = arr2[i];
        const value = arr1[i];

        if (resultObj[month]) {
          resultObj[month] += value;
        } else {
          resultObj[month] = value;
        }
      }

      const mergedArray1 = Object.values(resultObj);
      const mergedArray2 = Object.keys(resultObj);

      return [mergedArray1, mergedArray2];
    },
    fillMissingDatesAndReturnMonths(values, dateStrings) {
      const dates = dateStrings.map((dateString) => new Date(dateString));
      const result = [];
      const months = [];
      let currentDate = new Date(dates[0]);

      for (let i = 0; i < dates.length; i++) {
        const date = dates[i];

        while (currentDate < date) {
          result.push(NaN);
          months.push(
            `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
              .toString()
              .padStart(2, '0')}`
          );
          currentDate.setMonth(currentDate.getMonth() + 1);
        }

        result.push(values[i]);
        months.push(dateStrings[i]);
        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      // Fill in dates up to the current month if not present
      const today = new Date();
      while (currentDate <= today) {
        result.push(NaN);
        months.push(
          `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}`
        );
        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      const modifiedArray = result.map((element) => {
        return element === undefined ? NaN : element;
      });
      const [mergedValues, mergedMonths] = this.mergeAndSumArrays(
        modifiedArray,
        months
      );
      this.labels = mergedMonths;
      return mergedValues;
    },
    fillMissingDatesAndReturnMonthswithZero(values, dateStrings) {
      const dates = dateStrings.map((dateString) => new Date(dateString));
      const result = [];
      const months = [];
      let currentDate = new Date(dates[0]);

      for (let i = 0; i < dates.length; i++) {
        const date = dates[i];

        while (currentDate < date) {
          result.push(0);
          months.push(
            `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
              .toString()
              .padStart(2, '0')}`
          );
          currentDate.setMonth(currentDate.getMonth() + 1);
        }

        result.push(values[i]);
        months.push(dateStrings[i]);
        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      // Fill in dates up to the current month if not present
      const today = new Date();
      while (currentDate <= today) {
        result.push(0);
        months.push(
          `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}`
        );
        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      const modifiedArray = result.map((element) => {
        return element === undefined ? 0 : element;
      });
      const [mergedValues, mergedMonths] = this.mergeAndSumArrays(
        modifiedArray,
        months
      );
      this.labels = mergedMonths;
      return mergedValues;
    },
    getFirstMonthBySender(messages, senderName) {
      // Filter the messages by the specified sender
      const senderMessages = messages.filter(
        (message) => message.sender === senderName
      );

      // Sort the sender's messages by their unixTime
      senderMessages.sort((a, b) => a.unixTime - b.unixTime);

      // Check if there are any messages from the sender
      if (senderMessages.length > 0) {
        // Get the unixTime of the first message
        const firstUnixTime = senderMessages[0].unixTime;

        // Create a Date object from the unixTime
        console.log(senderMessages[0].unixTime);
        const firstMessageDateYear = new Date(firstUnixTime);
        const firstMessageDate = new Date(firstUnixTime * 1000); // Divide by 1000 to convert from seconds to milliseconds
        console.log(firstMessageDate);
        // Extract the year and month from the Date object
        const year = firstMessageDateYear.getFullYear();
        const month = (firstMessageDate.getUTCMonth() + 1)
          .toString()
          .padStart(2, '0'); // +1 because months are zero-based

        return `${year}-${month}`;
      } else {
        return 'No messages found for the specified sender.';
      }
    },

    sumArray(arr) {
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      return sum;
    },
    //#region parseTextFile
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
    //#endregion

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
      const oldlabels = Object.keys(totalMessagesPerMonth);
      const olddata = Object.values(result[0].total);
      const data = this.fillMissingDatesAndReturnMonths(olddata, oldlabels);
      const labels = this.labels;
      if (result.length > 3) {
        // Remove the second element (index 1)
        result.splice(1, 1);
      }

      //groupchat
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
      let data1 = [];
      let data2 = [];
      for (var i = 0; i < result.length; i++) {
        let data = result[i].total;
        const startDate = new Date(labels[0] + '-01');
        const endDate = new Date(
          this.getFirstMonthBySender(this.messages, result[i].sendername) +
            '-01'
        );
        if (labels[0] != endDate) {
          alert(labels[0]);

          const diffMonths =
            (endDate.getFullYear() - startDate.getFullYear()) * 12 +
            (endDate.getMonth() - startDate.getMonth());
          const missingMonths = Math.max(diffMonths, 0);
          missingMonths;
          for (let i = 0; i < missingMonths; i++) {
            alert(result[i].sendername);
            data.unshift(NaN);
            alert(data);
          }
        }
        if (i == 1) {
          data1 = this.fillMissingDatesAndReturnMonths(
            data,
            Object.values(oldlabels)
          );
        }
        if (i == 2) {
          data2 = this.fillMissingDatesAndReturnMonths(
            data,
            Object.values(oldlabels)
          );
        }
        console.log(data);
        const color1 = ['#4c86af', '#af4c58'];
        const color2 = ['#5ba2d450', '#c9576450'];
        let setcolor1 = null;
        let setcolor2 = null;
        if (i % 2 === 0) {
          setcolor1 = color1[1];
          setcolor2 = color2[1];
        } else {
          setcolor1 = color1[0];
          setcolor2 = color2[0];
        }
        if (i != 0) {
          const datay = {
            fill: true,
            label: result[i].sendername,
            pointBackgroundColor: setcolor1,
            pointHighlightStroke: setcolor1,
            backgroundColor: setcolor2,
            borderColor: setcolor1,
            data,
          };
          this.MessagesGroup.labels = labels;
          this.MessagesGroup.datasets.push(datay);
        }
      }

      this.totalMessagesPerson1 = this.sumArray(Object.values(result[1].total));

      this.totalMessagesPerson2 = this.sumArray(Object.values(result[2].total));

      this.avargeMessages = Math.round(
        (this.totalMessagesPerson1 + this.totalMessagesPerson2) / labels.length
      );
      this.avargeMessagesPerson1 = Math.round(
        this.totalMessagesPerson1 / labels.length
      );
      this.avargeMessagesPerson2 = Math.round(
        this.totalMessagesPerson2 / labels.length
      );
      this.MessagesByYearAndMonthPerson1 = {
        labels,
        datasets: [
          {
            label: result[1].sendername,
            backgroundColor: '#4c86af',
            borderColor: '#5ba2d4',
            data: Object.values(data1),
          },
          {
            label: 'Messages',
            backgroundColor: '#4caf5020',
            borderColor: '#8bc34a20',
            data,
          },
        ],
      };
      this.MessagesByYearAndMonthPerson2 = {
        labels,
        datasets: [
          {
            label: result[2].sendername,
            backgroundColor: '#af4c58',
            borderColor: '#c95764',
            data: Object.values(data2),
          },
          {
            label: 'Messages',
            backgroundColor: '#4caf5020',
            borderColor: '#8bc34a20',
            data,
          },
        ],
      };
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
            data: Object.values(data1),
          },
          {
            label: result[2].sendername,
            backgroundColor: '#af4c58',
            borderColor: '#8bc34a00',
            data: Object.values(data2),
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
