import { defineStore } from 'pinia';
import axios from 'axios';

export const useServerStore = defineStore('server', {
  state: () => {
    return {
      show: false,
      chat: [],
      people: [],
      chatid: null,
      sharedchart: {
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
    };
  },
  actions: {
    async shareChat(chat, people) {
      console.log(chat);
      console.log(people);
      try {
        console.log('try chat');
        const { data } = await axios.post(
          import.meta.env.VITE_SERVER + 'chat',
          {
            months: chat.months,
            m_count: chat.m_count,
            m_total: chat.m_total,
            m_img: chat.m_img,
            m_video: chat.m_video,
            m_audio: chat.m_audio,
            m_data: chat.m_data,
          }
        );
        for (let p = 0; p < people.length; p++) {
          console.log(p);
          await this.postPerson(people[p], data[0].chat_id);
          this.chatid = data[0].chat_id;
          console.log('ID: ' + this.chatid);
        }
        //navigator.vibration(200);
      } catch (err) {
        console.log('catch');
        console.log(err.response.data);
      }
    },
    async getChat(id) {
      try {
        const { data } = await axios.get(
          import.meta.env.VITE_SERVER + 'chat/' + id
        );
        this.chat = data[0];
        await this.getPeople(id);
        //navigator.vibration(200);
      } catch (error) {
        console.log('catch');
        if (error.response.status === 404)
          this.message.value = 'Server antwortet nicht';
        else this.message.value = error.response.data;
      }
    },
    async getPeople(id) {
      try {
        const { data } = await axios.get(
          import.meta.env.VITE_SERVER + 'chat/people/' + id
        );
        this.people = data;
        //navigator.vibration(200);
      } catch (error) {
        console.log('catch');
        if (error.response.status === 404)
          this.message.value = 'Server antwortet nicht';
        else this.message.value = error.response.data;
      }
    },
    async postPerson(person, id) {
      const guy = {
        name: person.name,
        pm_count: person.pm_count,
        chat_id: id,
      };
      console.log(guy);
      console.log('try people');
      const { data } = await axios.post(
        import.meta.env.VITE_SERVER + 'person',
        guy
      );
      console.log(data);
      //navigator.vibration(200);
    },
    async delChat(id) {
      try {
        await axios.delete(import.meta.env.VITE_SERVER + 'chat/' + id);
        //navigator.vibration(200);
      } catch (error) {
        console.log('catch');
        if (error.response.status === 404)
          this.message.value = 'Server antwortet nicht';
        else this.message.value = error.response.data;
      }
    },
    async patchChat() {},
    async generateCharts(id) {
      await this.getChat(id);
      await this.Chart();
    },
    async Chart() {
      this.sharedchart.labels = this.chat.months;

      await this.sharedchart.datasets.push({
        label: 'total messages',
        data: this.chat.m_count,
        backgroundColor: '#4caf50',
        borderColor: '#8bc34a',
      });
      await this.sharedchart.datasets.push({
        label: this.people[0].name,
        data: this.people[0].pm_count,
        backgroundColor: '#4c86af',
        borderColor: '#5ba2d4',
      });

      this.sharedchart.datasets.push({
        label: this.people[1].name,
        data: this.people[1].pm_count,
        backgroundColor: '#af4c58',
        borderColor: '#c95764',
      });

      this.total = {
        labels: this.chat.months,
        datasets: [
          {
            label: 'total messages',
            data: this.chat.m_count,
            pointBackgroundColor: null,
            pointHighlightStroke: null,
            backgroundColor: '#4caf50',
            borderColor: '#8bc34a',
          },
        ],
      };
      this.Person1 = {
        labels: this.chat.months,
        datasets: [
          {
            label: this.people[0].name,
            data: this.people[0].pm_count,
            backgroundColor: '#4c86af',
            borderColor: '#5ba2d4',
          },
        ],
      };
      this.Person2 = {
        labels: this.chat.months,
        datasets: [
          {
            label: this.people[1].name,
            data: this.people[1].pm_count,
            backgroundColor: '#af4c58',
            borderColor: '#c95764',
          },
        ],
      };
    },
  },
});
