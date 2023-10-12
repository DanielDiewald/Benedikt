<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useModeStore } from './stores/darkmode.js';

const $q = useQuasar();
const darkmode = useModeStore();
$q.dark.set(darkmode.darkmode);

function darkmodeswitch() {
  $q.dark.toggle();
  darkmode.darkmode = $q.dark.isActive;
  localStorage.setItem('mode', String($q.dark.isActive));
}
</script>

<template>
  <div class="row">
    <div class="col">
      <p class="text-brand q-ml-md q-mt-lg">
        <span>🦉</span> Benedikt | your WhatsApp assistant
      </p>
    </div>
    <div class="col-4 text-right">
      <q-btn
        class="q-mt-md q-mr-lg text-brand"
        flat
        round
        @click="darkmodeswitch()"
      >
        <q-icon v-if="$q.dark.isActive == false" name="dark_mode"></q-icon>
        <q-icon v-if="$q.dark.isActive == true" name="light_mode"></q-icon
      ></q-btn>
    </div>
  </div>

  <div class="q-pa-md" style="width: 100%">
    <router-view />
  </div>
</template>

<style></style>
