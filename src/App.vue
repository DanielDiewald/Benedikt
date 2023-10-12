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
    <div class="col text-left">
      <q-btn
        class="q-ml-md q-mt-md text-brand"
        flat
        round
        @click="darkmodeswitch()"
      >
        <q-icon v-if="$q.dark.isActive == false" name="dark_mode"></q-icon>
        <q-icon v-if="$q.dark.isActive == true" name="light_mode"></q-icon
      ></q-btn>
    </div>

    <p class="text-brand q-mt-lg q-mr-lg text-right col">
      Benedikt | your WhatsApp assistant
    </p>
  </div>

  <div class="q-pa-md" style="width: 100%">
    <router-view />
  </div>
</template>

<style></style>
