<template>
  <Line
    :data="chatStore.MessagesByYearAndMonth"
    :options="options"
    style="max-height: 50vh"
    v-if="darkmode.darkmode == true"
  />
  <Line
    :data="chatStore.MessagesByYearAndMonth"
    :options="optionslight"
    style="max-height: 50vh"
    v-else
  />
</template>

<script setup>
import { useModeStore } from '../stores/darkmode.js';
const darkmode = useModeStore();
import { ref, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import { useChatStore } from '../stores/chat.js';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const color = ref('#161f32');
const lightcolor = ref('#f5f5f5');

const options = ref({
  responsive: true,
  scales: {
    x: {
      grid: {
        display: true,
        color: color,
      },
      ticks: {
        display: false,
        color: color,
      },
    },
    y: {
      grid: {
        color: color,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
});
const optionslight = ref({
  responsive: true,
  scales: {
    x: {
      grid: {
        display: true,
        color: lightcolor,
      },
      ticks: {
        display: false,
        color: lightcolor,
      },
    },
    y: {
      grid: {
        color: lightcolor,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
});
const chatStore = useChatStore();
</script>
