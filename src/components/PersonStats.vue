<template>
  <div class="q-mt-md" v-if="chatStore.messages != null">
    <div class="row items-start">
      <div class="col-4 col-lg-2">
        <q-item>
          <q-item-section avatar>
            <q-icon color="brand" class="ben-brand" name="message" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ chatStore.totalMessages }}</q-item-label>
            <q-item-label caption lines="2" class="gt-sm"
              >messages</q-item-label
            ></q-item-section
          >
        </q-item>
      </div>
      <div class="col-4 col-lg-2">
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="message" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ chatStore.totalMessagesPerson1 }}</q-item-label>
            <q-item-label caption lines="2" class="gt-sm">{{
              chatStore.MessagesByYearAndMonthPerson1.datasets[0].label
            }}</q-item-label></q-item-section
          >
        </q-item>
      </div>
      <div class="col-4 col-lg-2">
        <q-item>
          <q-item-section avatar>
            <q-icon color="secondary" name="message" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ chatStore.totalMessagesPerson2 }}</q-item-label>
            <q-item-label caption lines="2" class="gt-sm">{{
              chatStore.MessagesByYearAndMonthPerson2.datasets[0].label
            }}</q-item-label></q-item-section
          >
        </q-item>
      </div>
      <!---->
      <div class="col-4 col-lg-2">
        <q-item>
          <q-item-section avatar>
            <q-icon color="brand" class="ben-brand" name="calendar_month" />
          </q-item-section>
          <q-item-section>
            <q-tooltip> average messages by month </q-tooltip>
            <q-item-label>{{ chatStore.avargeMessages }}</q-item-label>
            <q-item-label caption lines="2" class="gt-sm"
              >average messages</q-item-label
            ></q-item-section
          >
        </q-item>
      </div>
      <div class="col-4 col-lg-2">
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="calendar_month" />
          </q-item-section>
          <q-item-section>
            <q-tooltip>
              average messages by month of
              {{ chatStore.MessagesByYearAndMonthPerson1.datasets[0].label }}
            </q-tooltip>
            <q-item-label>{{ chatStore.avargeMessagesPerson1 }}</q-item-label>
            <q-item-label caption lines="2" class="gt-sm">{{
              chatStore.MessagesByYearAndMonthPerson1.datasets[0].label
            }}</q-item-label></q-item-section
          >
        </q-item>
      </div>
      <div class="col-4 col-lg-2">
        <q-item>
          <q-item-section avatar>
            <q-icon color="secondary" name="calendar_month" />
          </q-item-section>
          <q-item-section>
            <q-tooltip>
              average messages by month of
              {{
                chatStore.MessagesByYearAndMonthPerson2.datasets[0].label
              }}</q-tooltip
            >
            <q-item-label>{{ chatStore.avargeMessagesPerson2 }}</q-item-label>
            <q-item-label caption lines="2" class="gt-sm">{{
              chatStore.MessagesByYearAndMonthPerson2.datasets[0].label
            }}</q-item-label></q-item-section
          >
        </q-item>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useChatStore } from '../stores/chat.js';

const chatStore = useChatStore();
</script>
