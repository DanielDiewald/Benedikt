<template>
  <div class="benediktapp">
    <div v-if="dataloading == true" class="text-center">
      <q-spinner-hourglass color="brand" size="10vw" :thickness="8" />
    </div>
    <div class="q-ma-md" v-if="dataloading == false">
      <p class="text-h4 text-brand text-bold q-mb-none">Shared Stats</p>
      <p class="q-mt-none">
        <span>#{{ chat.id }} <q-tooltip>Chat #ID</q-tooltip></span>
        Views: {{ backend.chat.views }}
        <q-btn
          flat
          color="secondary"
          icon="delete"
          round
          to="/"
          @click="backend.delChat(chat.id)"
          size="sm"
        >
          <q-tooltip>Delete Chat</q-tooltip>
        </q-btn>
      </p>

      <q-separator />
      <div class="row items-start">
        <div class="col-4 col-lg-2">
          <q-item>
            <q-item-section avatar>
              <q-icon color="brand" class="ben-brand" name="message" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ backend.chat.m_total }}</q-item-label>
              <q-item-label caption lines="2" class="gt-xs"
                >messages</q-item-label
              ></q-item-section
            >
          </q-item>
        </div>
        <div class="col-4 col-lg-2">
          <q-item>
            <q-item-section avatar>
              <q-icon color="brand" name="people" />
            </q-item-section>
            <q-item-section>
              <q-item-label> {{ backend.people.length }} </q-item-label>
              <q-item-label caption lines="2" class="gt-xs"
                >people in chat</q-item-label
              ></q-item-section
            >
          </q-item>
        </div>
        <div class="col-4 col-lg-2">
          <q-item>
            <q-item-section avatar>
              <q-icon color="brand" class="ben-brand" name="description" />
            </q-item-section>
            <q-item-section>
              <q-item-label> {{ backend.chat.m_data }}</q-item-label>
              <q-item-label caption lines="2" class="gt-xs"
                >words</q-item-label
              ></q-item-section
            >
          </q-item>
        </div>
        <div class="col-4 col-lg-2">
          <q-item>
            <q-item-section avatar>
              <q-icon color="brand" class="ben-brand" name="image" />
            </q-item-section>
            <q-item-section>
              <q-item-label> {{ backend.chat.m_img }} </q-item-label>
              <q-item-label caption lines="2" class="gt-xs"
                >images</q-item-label
              ></q-item-section
            >
          </q-item>
        </div>
        <div class="col-4 col-lg-2">
          <q-item>
            <q-item-section avatar>
              <q-icon color="brand" class="ben-brand" name="movie" />
            </q-item-section>
            <q-item-section>
              <q-item-label> {{ backend.chat.m_video }} </q-item-label>
              <q-item-label caption lines="2" class="gt-xs"
                >videos</q-item-label
              ></q-item-section
            >
          </q-item>
        </div>
        <div class="col-4 col-lg-2">
          <q-item>
            <q-item-section avatar>
              <q-icon color="brand" class="ben-brand" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-item-label> {{ backend.chat.m_audio }}</q-item-label>
              <q-item-label caption lines="2" class="gt-xs"
                >voicemails</q-item-label
              ></q-item-section
            >
          </q-item>
        </div>
      </div>

      <q-separator />

      <LineChartShared v-if="backend.show == true"></LineChartShared>
    </div>
  </div>
</template>

<script setup>
import LineChartShared from '../components/LineChartShared.vue';
import { ref, onMounted } from 'vue';
import { useServerStore } from '../stores/backend.js';
const dataloading = ref(true);
const backend = useServerStore();
const chat = defineProps({
  id: String,
});
onMounted(async () => {
  await backend.generateCharts(chat.id);
  await setTimeout(function () {
    backend.show = true;
    dataloading.value = false;
  }, 2000);
});
</script>
