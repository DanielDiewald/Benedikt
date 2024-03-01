<template>
  <q-card>
    <q-card-section class="row items-center">
      <q-avatar color="brand" text-color="white"
        ><img src="/logo.png"
      /></q-avatar>
      <span class="q-ml-sm text-uppercase">privacy information</span>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <p>
        Share your usage insights securely with our tracking system. Your
        privacy is our priority—only your stats are saved, and private messages
        remain confidential. Stats are deleted after one week for added
        security.
      </p>
      {{ ChartStore.Person1.datasets[0].data }}
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn rounded flat label="Cancel" v-close-popup />
      <q-btn
        rounded
        unelevated
        label="Agree"
        color="brand"
        @click="sharechat()"
      />
    </q-card-actions>
  </q-card>
</template>
<style lang="sass" scoped>
.q-card
  background: rgba( 255, 255, 255, 0.70 ) !important
  box-shadow: none !important
  backdrop-filter: blur( 4px )
  -webkit-backdrop-filter: blur( 4px )
  border-radius: 16px !important
.q-card--dark
  background: #11182795 !important
  box-shadow: none !important
  backdrop-filter: blur( 4px )
  -webkit-backdrop-filter: blur( 4px )
  border-radius: 16px !important
</style>
<script setup>
import PersonStats from './PersonStats.vue';
import { ref, onMounted } from 'vue';
import { useChartStore } from '../stores/chatchart';
import { useServerStore } from '../stores/backend.js';
import { useChatAnalyseStore } from '../stores/chatanalyse';

const backendserver = useServerStore();
const ChartStore = useChartStore();
const analyticsStore = useChatAnalyseStore();

function sharechat() {
  const chat = {
    months: Object.values(ChartStore.MessagesGroupChart1.labels),
    m_count: Object.values(ChartStore.MessagesGroupChart1.datasets[1].data),
    m_total: analyticsStore.totalMessages,
    m_img: analyticsStore.images,
    m_video: analyticsStore.videos,
    m_audio: analyticsStore.audios,
    m_data: analyticsStore.words,
  };
  const people = [
    {
      name: 'Person1',
      pm_count: Object.values(ChartStore.Person1.datasets[0].data),
    },
    {
      name: 'Person2',
      pm_count: Object.values(ChartStore.Person2.datasets[0].data),
    },
  ];
  backendserver.shareChat(chat, people);
}
</script>
