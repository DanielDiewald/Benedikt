<template>
  <div class="row">
    <div class="col-6 col-lg-4">
      <Pie :data="data" :options="options" />
    </div>
  </div>
</template>

<script setup>
import { useChatAnalyseStore } from '../stores/chatanalyse.js';
const cas = useChatAnalyseStore();
import { ref, onMounted } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Filler,
  ArcElement,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);
import { Pie } from 'vue-chartjs';

const data = ref({
  labels: ['Images', 'Videos', 'Audios'],
  datasets: [
    {
      backgroundColor: ['#4caf50', '#4c86af', '#af4c58'],
      data: [cas.images, cas.videos, cas.audios],
      borderColor: 'transparent',
    },
  ],
});

const options = ref({
  type: 'pie',
});
</script>
