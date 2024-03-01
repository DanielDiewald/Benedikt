import { defineStore } from 'pinia';
import axios from 'axios';

export const useServerStore = defineStore('server', {
  state: () => {
    return {
      chat: [],
      people: [],
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
        this.chat = data;
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
  },
});
