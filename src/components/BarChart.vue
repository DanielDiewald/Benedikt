<template>
  <div class="q-ma-md">
    <p class="text-h4 text-brand text-bold gt-sm">
      <span class="ben-brand">Messages by month</span>
    </p>
    <p class="text-h6 text-brand q-mr-md text-bold lt-md">
      <span class="ben-brand">Messages by month</span>
    </p>
  </div>
  <div class="q-ma-md">
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
  </div>
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
        display: true,
        color: lightcolor,
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
        display: true,
        color: color,
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
