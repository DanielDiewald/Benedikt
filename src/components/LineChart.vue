<template>
  
  <div>
    <q-btn
      icon="circle"
      flat
      color="brand"
      class="text-lowercase"
      rounded
      @click="selectedchart = null"
      >&#160 Total messages</q-btn
    >
    <q-btn
      flat
      icon="circle"
      color="primary"
      class="text-capitalize"
      rounded
      @click="selectedchart = 1"
      >&#160  {{chatStore.MessagesByYearAndMonthPerson1.datasets[0].label}}</q-btn
    >
    
    <q-btn
      flat
      icon="circle"
      color="secondary"
      class="text-capitalize"
      rounded
      @click="selectedchart = 2"
      >&#160  {{chatStore.MessagesByYearAndMonthPerson2.datasets[0].label}}</q-btn
    >
  </div>
  <div class="q-ma-md">
    <Line
      :data="chatStore.MessagesByYearAndMonthExtended"
      :options="options"
      style="max-height: 50vh"
      v-if="darkmode.darkmode == true && selectedchart == null"
    />
    <Line
      :data="chatStore.MessagesByYearAndMonthPerson1"
      :options="options"
      style="max-height: 50vh"
      v-if="darkmode.darkmode == true && selectedchart == 1"
    />
    <Line
      :data="chatStore.MessagesByYearAndMonthPerson2"
      :options="options"
      style="max-height: 50vh"
      v-if="darkmode.darkmode == true && selectedchart == 2"
    />
    <Line
      :data="chatStore.MessagesByYearAndMonthExtended"
      :options="optionslight"
      style="max-height: 50vh"
      v-if="darkmode.darkmode == false && selectedchart == null"
    />
    <Line
      :data="chatStore.MessagesByYearAndMonthPerson1"
      :options="optionslight"
      style="max-height: 50vh"
      v-if="darkmode.darkmode == false && selectedchart == 1"
    />
    <Line
      :data="chatStore.MessagesByYearAndMonthPerson2"
      :options="optionslight"
      style="max-height: 50vh"
      v-if="darkmode.darkmode == false && selectedchart == 2"
    />
  </div>
  <div class="q-ma-md">
  <Line
      :data="chatStore.MessagesGroup"
      :options="optionsgroup"
      style="max-height: 50vh"
      v-if="darkmode.darkmode == true && chatStore.uniqueSenders == 2"
    /></div>
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
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
const selectedchart = ref(null);
const color = ref('#161f32');
const lightcolor = ref('#f5f5f5');

const optionsgroup = ref({
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
      stacked: true,
      grid: {
        color: color,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    }
  },
  
  elements: {
    line: {
      tension: 0.4,
    },
  },
});
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
    }
  },
  
  elements: {
    line: {
      spanGaps: false, // Add this line to disable spanning gaps
      borderCapStyle: 'round',
      tension: 0.4,
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
    }
  },
  
  elements: {
    line: {
      spanGaps: false, // Add this line to disable spanning gaps
      borderCapStyle: 'round',
      tension: 0.4,
    },
  },
});
const chatStore = useChatStore();
</script>
