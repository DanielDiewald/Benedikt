import { defineStore } from 'pinia';
import { axios } from 'axios';

export const useServerStore = defineStore('server', {
  state: () => {
    return {
      chat: [],
    };
  },
  actions: {
    async shareChat(chat, people) {
      try {
        console.log('try');
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
          await this.postPerson(people[p], data.chat_id);
        }
        alert('Chat added!');
        navigator.vibration(200);
      } catch (error) {
        console.log('catch');
        if (error.response.status === 404)
          this.message.value = 'Server antwortet nicht';
        else this.message.value = error.response.data;
      }
    },
    async getChat(id) {
      try {
        const { data } = await axios.get(
          import.meta.env.VITE_SERVER + 'chat/' + id
        );
        this.chat = data;
        navigator.vibration(200);
      } catch (error) {
        console.log('catch');
        if (error.response.status === 404)
          this.message.value = 'Server antwortet nicht';
        else this.message.value = error.response.data;
      }
    },
    async postPerson(person, id) {
      try {
        console.log('try');
        await axios.post(import.meta.env.VITE_SERVER + 'person', {
          name: person.name,
          pm_count: person.pm_count,
          chat_id: id,
        });
        navigator.vibration(200);
      } catch (error) {
        console.log('catch');
        if (error.response.status === 404)
          this.message.value = 'Server antwortet nicht';
        else this.message.value = error.response.data;
      }
    },
    async delChat() {},
    async patchChat() {},
  },
});
