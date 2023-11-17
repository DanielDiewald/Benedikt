<script setup>
import { ref } from 'vue';
import { useChatStore } from '../stores/chat.js';
import LineChart from '../components/LineChart.vue';
import HowTo from '../components/HowTo.vue';
import { useChatAnalyseStore } from '../stores/chatanalyse.js';
import { useChartStore } from '../stores/chatchart.js';
import { useChatCountStore } from '../stores/chatcount.js';

const ccs = useChatCountStore();
const cas = useChatAnalyseStore();
const chatChartStore = useChartStore();
const file = ref(null);
const software = ref(true);
async function handleUpload() {
  console.log('handleUpload is triggered');
  let text;
  if (file.value) {
    text = await file.value.text();
    localStorage.setItem('chat', text);
    if (software.value == true) {
      await cas.ios(text);
      await chatChartStore.dataanalyse(ccs.PerMonth(cas.messages));
      await chatChartStore.dataanalyseprivatechat(ccs.PerMonth(cas.messages));
    } else {
      await cas.android(text);
      await chatChartStore.dataanalyse(ccs.PerMonth(cas.messages));
      await chatChartStore.dataanalyseprivatechat(ccs.PerMonth(cas.messages));
    }
  }
}
</script>

<template>
  <div class="q-ma-md">
    <p class="text-h4 text-brand text-bold gt-sm">
      <span class="ben-brand">Upload</span>
    </p>
    <p class="text-h6 text-brand q-mr-md text-bold lt-md">
      <span class="ben-brand">Upload</span>
    </p>
  </div>
  <div class="q-ml-md">
    Android <q-toggle v-model="software" color="brand" /> IOS
  </div>
  <q-file
    style="backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px)"
    class="q-ma-md"
    rounded
    standout
    v-model="file"
    accept=".txt"
    @update:model-value="handleUpload()"
    label="upload chat as txt"
  >
    <template v-slot:prepend> <q-icon name="attach_file" /> </template>
  </q-file>

  <HowTo v-if="cas.messages == null"></HowTo>
  <div class="q-mt-md q-mb-md" v-if="cas.messages != null">
    <q-separator />
    <div class="row items-start">
      <div class="col-4 col-lg-2">
        <q-item>
          <q-item-section avatar>
            <q-icon color="brand" class="ben-brand" name="message" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ cas.totalMessages }}</q-item-label>
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
            <q-item-label> uwu </q-item-label>
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
            <q-item-label> uwu</q-item-label>
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
            <q-item-label> uwu </q-item-label>
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
            <q-item-label> uwu </q-item-label>
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
            <q-item-label>uwu</q-item-label>
            <q-item-label caption lines="2" class="gt-xs"
              >voicemails</q-item-label
            ></q-item-section
          >
        </q-item>
      </div>
    </div>

    <q-separator />
  </div>
  <LineChart v-if="cas.messages != null" />
  <br />
  <br />
  <br />
  <br />
</template>
