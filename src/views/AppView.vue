<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useChatStore } from '../stores/chat.js';
import BarChart from '../components/BarChart.vue';
import HowTo from '../components/HowTo.vue';

const chatStore = useChatStore();
const { messages } = storeToRefs(chatStore);
const file = ref(null);

async function handleUpload() {
  console.log('handleUpload is triggered');
  let text;
  if (file.value) {
    text = await file.value.text();
    localStorage.setItem('chat', text);

    await chatStore.parseTextFile(text);
    console.log(chatStore.messages);
    await chatStore.countUniqueSenders(chatStore.messages);
    await chatStore.countMessagesByYearAndMonth(chatStore.messages);
    await chatStore.extractWordsFromMessages(chatStore.messages);
  }
}
</script>

<template>
  <HowTo v-if="chatStore.messages == null"></HowTo>
  <BarChart v-if="chatStore.messages != null" />
  <div class="q-ma-md">
    <p class="text-h4 text-brand text-bold gt-sm">
      <span class="ben-brand">Upload</span>
    </p>
    <p class="text-h6 text-brand q-mr-md text-bold lt-md">
      <span class="ben-brand">Upload</span>
    </p>
  </div>

  <q-file
    style="backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px)"
    class="q-ma-lg"
    rounded
    standout
    v-model="file"
    accept=".txt"
    @update:model-value="handleUpload()"
    label="upload chat as txt"
  >
    <template v-slot:prepend> <q-icon name="attach_file" /> </template>
  </q-file>
  <div class="q-mt-md" v-if="chatStore.messages != null">
    <div class="row items-start">
      <div class="col-4 col-lg-2">
        <q-item>
          <q-item-section avatar>
            <q-icon color="brand" name="message" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ chatStore.totalMessages }}</q-item-label>
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
            <q-item-label>{{ chatStore.uniqueSenders }}</q-item-label>
            <q-item-label caption lines="2" class="gt-xs"
              >people in chat</q-item-label
            ></q-item-section
          >
        </q-item>
      </div>
      <div class="col-4 col-lg-2">
        <q-item>
          <q-item-section avatar>
            <q-icon color="brand" name="description" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ chatStore.wordscount }}</q-item-label>
            <q-item-label caption lines="2" class="gt-xs"
              >words</q-item-label
            ></q-item-section
          >
        </q-item>
      </div>
      <div class="col-4 col-lg-2">
        <q-item>
          <q-item-section avatar>
            <q-icon color="brand" name="image" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ chatStore.uniqueSenders }}</q-item-label>
            <q-item-label caption lines="2" class="gt-xs"
              >images</q-item-label
            ></q-item-section
          >
        </q-item>
      </div>
      <div class="col-4 col-lg-2">
        <q-item>
          <q-item-section avatar>
            <q-icon color="brand" name="movie" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ chatStore.uniqueSenders }}</q-item-label>
            <q-item-label caption lines="2" class="gt-xs"
              >videos</q-item-label
            ></q-item-section
          >
        </q-item>
      </div>
      <div class="col-4 col-lg-2">
        <q-item>
          <q-item-section avatar>
            <q-icon color="brand" name="mic" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ chatStore.uniqueSenders }}</q-item-label>
            <q-item-label caption lines="2" class="gt-xs"
              >voicemails</q-item-label
            ></q-item-section
          >
        </q-item>
      </div>
    </div>
  </div>
  <br />
  <br />
  <br />
  <br />
</template>
