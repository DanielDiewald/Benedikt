<script setup>
import { ref, onMounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useModeStore } from './stores/darkmode.js';
import { onlineTest } from '@/utils/onlineTest.js';

let isOnline = ref(true);
let update = ref(false);

const $q = useQuasar();
const darkmode = useModeStore();
$q.dark.set(darkmode.darkmode);

function darkmodeswitch() {
  $q.dark.toggle();
  darkmode.darkmode = $q.dark.isActive;
  localStorage.setItem('mode', String($q.dark.isActive));
}

const synchronize = async () => {
  console.log('syncing...');
};

const onRestart = async () => {
  isOnline.value = await onlineTest();
  window.addEventListener('online', () => (isOnline.value = true));
  window.addEventListener('offline', () => (isOnline.value = false));
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
  window.location.reload();
};
onMounted(async () => {
  isOnline.value = await onlineTest();
  window.addEventListener('online', () => {
    isOnline.value = true;
    synchronize();
  });
  window.addEventListener('offline', () => (isOnline.value = false));
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    console.log('registration failed!');
    return;
  }
  registration.addEventListener('updatefound', () => (update.value = true));
  if (registration.waiting) update.value = true;
  if (update.value == true) {
    $q.notify({
      timeout: 10000,
      message: 'There is a new Update.',
      color: 'brand',
      avatar: '/logo.png',
      actions: [
        {
          label: 'Update',
          color: 'white',
          handler: () => {
            onRestart();
          },
        },
        {
          label: 'Dismiss',
          color: 'white',
          handler: () => {
            /* ... */
          },
        },
      ],
    });
  }
  if (isOnline.value == true) await synchronize();
});

watch(isOnline, async (newvalue, oldvalue) => {
  if (!newvalue) {
    $q.notify({
      timeout: 2500,
      message: 'You are offline...',
      color: 'secondarybrand',
      avatar: '/logo.png',
      actions: [
        {
          label: 'Dismiss',
          color: 'white',
          handler: () => {
            /* ... */
          },
        },
      ],
    });
  } else {
    $q.notify({
      timeout: 2500,
      message: 'You are online!',
      color: 'brand',
      avatar: '/logo.png',
      actions: [
        {
          label: 'Dismiss',
          color: 'white',
          handler: () => {
            /* ... */
          },
        },
      ],
    });
  }
});
watch(update, async (newvalue, oldvalue) => {
  if (newvalue == true) {
    $q.notify({
      timeout: 10000,
      message: 'There is a new Update.',
      color: 'brand',
      avatar: '/logo.png',
      actions: [
        {
          label: 'Update',
          color: 'white',
          handler: () => {
            onRestart();
          },
        },
        {
          label: 'Dismiss',
          color: 'white',
          handler: () => {
            /* ... */
          },
        },
      ],
    });
  }
});
</script>

<template>
  <div class="row">
    <div class="col">
      <q-btn size="sm" rounded flat class="q-ml-md q-mt-lg text-no-wrap" to="/"
        ><p class="text-brand q-mb-none">
          <span>🦉<q-img src="/logo.png" style="display: none" /> </span>
          <span class="ben-brand"
            ><span class="text-bold">Benedikt</span> | your WhatsApp
            assistant</span
          >
        </p></q-btn
      >
    </div>
    <div class="col-3 text-right">
      <q-btn
        class="q-mt-md q-mr-md text-brand"
        flat
        round
        @click="darkmodeswitch()"
      >
        <q-icon
          v-if="$q.dark.isActive == false"
          name="dark_mode"
          class="ben-brand"
        ></q-icon>
        <q-icon
          v-if="$q.dark.isActive == true"
          name="light_mode"
          class="ben-brand"
        ></q-icon
      ></q-btn>
    </div>
  </div>

  <div class="q-pa-md" style="width: 100%">
    <p class="text-secondary">Online: {{ isOnline }} Update: {{ update }}</p>
    <router-view />
  </div>
</template>

<style></style>
