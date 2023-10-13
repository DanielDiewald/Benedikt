<template>
  <Bar :data="chatStore.MessagesByYearAndMonth" />
</template>

<script setup>
import { ref } from 'vue';
import { Bar, Line } from 'vue-chartjs';
import { useChatStore } from '../stores/chat.js';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chatStore = useChatStore();
</script>
