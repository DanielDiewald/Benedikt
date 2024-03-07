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
      @click="selectedchart = 1"> &#160  {{backend.people[0].name}}</q-btn
    >
    
    <q-btn
      flat
      icon="circle"
      color="secondary"
      class="text-capitalize"
      rounded
      @click="selectedchart = 2"
      >&#160  {{backend.people[1].name}}</q-btn
    >
  </div>
  <div class="q-ma-md">
   <Line
      :data="backend.sharedchart"
      :options="options"
      style="max-height: 50vh"
      v-if="darkmode.darkmode == true && selectedchart == null"
    />
  
    <Line
      :data="backend.sharedchart"
      :options="optionslight"
      style="max-height: 50vh"
      v-if="darkmode.darkmode == false && selectedchart == null"
    />
    <Line
      :data="backend.Person1"
      :options="optionslight"
      style="max-height: 50vh"
      v-if="darkmode.darkmode == false && selectedchart == 1"
    />
    <Line
      :data="backend.Person2"
      :options="optionslight"
      style="max-height: 50vh"
      v-if="darkmode.darkmode == false && selectedchart == 2"
    />
      <Line
      :data="backend.Person1"
      :options="options"
      style="max-height: 50vh"
      v-if="darkmode.darkmode == true && selectedchart == 1"
    />
    <Line
      :data="backend.Person2"
      :options="options"
      style="max-height: 50vh"
      v-if="darkmode.darkmode == true && selectedchart == 2"
    />
  </div>
</template>

<script setup>

import { useModeStore } from '../stores/darkmode.js';
import { ref } from 'vue';
import { Line } from 'vue-chartjs';
import { useChatStore } from '../stores/chat.js';
import { useChartStore } from '../stores/chatchart';
import { useServerStore } from '../stores/backend.js';
const darkmode = useModeStore();
const backend = useServerStore();
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js';

ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);
const selectedchart = ref(null);
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
</script>
