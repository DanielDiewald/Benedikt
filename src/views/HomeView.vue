<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useChatStore } from '../stores/chat.js';
import BarChart from '../components/BarChart.vue';

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
  }
}
</script>

<template>
  <BarChart v-if="chatStore.messages != null" />
  <q-file
    rounded
    standout
    v-model="file"
    accept=".txt"
    @update:model-value="handleUpload()"
    label="_chat.txt"
  >
    <template v-slot:prepend> <q-icon name="attach_file" /> </template>
    <template v-slot:append>
      <q-btn round dense flat icon="help"
        ><q-tooltip>Tutorial</q-tooltip></q-btn
      >
    </template>
  </q-file>
  <div class="q-mt-md" v-if="chatStore.messages != null">
    <div class="row">
      <div>
        <q-item>
          <q-item-section avatar>
            <q-icon color="brand" name="messages" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ chatStore.totalMessages }}</q-item-label>
            <q-item-label caption lines="2" class="gt-xs"
              >total messages</q-item-label
            ></q-item-section
          >
        </q-item>
      </div>
      <q-separator vertical inset />
      <div>
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
    </div>
  </div>
</template>
<style lang="sass">
.text-brand
  color: $green !important
.bg-brand
  background: linear-gradient(160deg, $light-green 0%, $green 40%) !important
</style>
