<script setup>
import { ref } from 'vue';
import { useChatStore } from '../stores/chat.js';
import LineChart from '../components/LineChart.vue';
import HowTo from '../components/HowTo.vue';
import { useChatAnalyseStore } from '../stores/chatanalyse.js';
import { useChartStore } from '../stores/chatchart.js';
import { useChatCountStore } from '../stores/chatcount.js';
import HowToAndroid from '../components/HowToAndroid.vue';
import PieChart from '../components/PieChart.vue';
import ShareView from '../components/ShareView.vue';

const ccs = useChatCountStore();
const cas = useChatAnalyseStore();
const chatChartStore = useChartStore();
const cs = useChartStore();

const file = ref(null);
const sharedata = ref(false);
const dataloading = ref(false);
const software = ref(true);
async function handleUpload() {
  cs.display == false;
  dataloading.value = true;
  console.log('handleUpload is triggered');
  let text;
  if (file.value) {
    text = await file.value.text();
    localStorage.setItem('chat', text);
    if (software.value == true) {
      await cas.ios(text);
      await chatChartStore.dataanalyse(ccs.PerMonth(cas.messages));
      await chatChartStore.dataanalyseprivatechat(ccs.PerMonth(cas.messages));
      await cas.getUniqueSenders(cas.messages);
      await cas.countWords(cas.messages);
      await cas.countOmittedMessages(cas.messages);

      await setTimeout(function () {
        dataloading.value = false;
        cs.display = true;
      }, 2000);
    } else {
      await cas.android(text);
      await chatChartStore.dataanalyse(ccs.PerMonth(cas.messages));
      await chatChartStore.dataanalyseprivatechat(ccs.PerMonth(cas.messages));
      await cas.getUniqueSenders(cas.messages);
      await cas.countWords(cas.messages);
      await cas.countOmittedMessages(cas.messages);

      await setTimeout(function () {
        dataloading.value = false;
        cs.display = true;
      }, 2000);
    }
  }
}
function reloadepage() {
  window.location.reload();
}
</script>

<template>
  <div class="benediktapp">
    <template v-if="cs.display == false">
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

      <HowTo
        v-if="cas.messages == null && software == true && dataloading == false"
      ></HowTo>
      <HowToAndroid
        v-if="cas.messages == null && software == false && dataloading == false"
      ></HowToAndroid>
    </template>

    <div class="q-mt-md q-mb-md" v-if="cs.display == true">
      <div class="q-mb-md">
        <q-btn
          rounded
          color="brand"
          size="md"
          class="q-mr-sm"
          unelevated
          @click="reloadepage()"
          >Upload new file</q-btn
        >
        <q-btn
          rounded
          flat
          icon="share"
          size="md"
          @click="sharedata = true"
          unelevated
          >share</q-btn
        >

        <p class="q-mt-sm">
          Chat between: <template v-for="s in cas.senders">{{ s }}, </template>
        </p>
      </div>
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
              <q-item-label> {{ cas.senders.length }} </q-item-label>
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
              <q-item-label> {{ cas.words }}</q-item-label>
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
              <q-item-label> {{ cas.images }} </q-item-label>
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
              <q-item-label> {{ cas.videos }} </q-item-label>
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
              <q-item-label>{{ cas.audios }}</q-item-label>
              <q-item-label caption lines="2" class="gt-xs"
                >voicemails</q-item-label
              ></q-item-section
            >
          </q-item>
        </div>
      </div>

      <q-separator />
    </div>
    <div v-if="dataloading == true" class="text-center">
      <q-spinner-hourglass color="brand" size="10vw" :thickness="8" />
    </div>
    <div v-if="cs.display == true && cs.display != false">
      <LineChart v-if="cs.display == true" />

      <PieChart class="q-ma-md" v-if="cs.display == true"></PieChart>
    </div>
  </div>
  <q-dialog v-model="sharedata" persistent>
    <ShareView></ShareView>
  </q-dialog>
</template>

<style lang="sass">

@media (min-width: $breakpoint-md-max)
  .benediktapp
    width: 80vw
    margin-left: 10vw
    margin-right: 10vw
</style>
