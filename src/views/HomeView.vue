<script setup>
import { storeToRefs } from 'pinia';
import { useMyStore } from '../stores/myStore';
import { ref } from 'vue';
import { useChatStore } from '../stores/chat.js';
const chat = useChatStore();

const profile = ref(
  'https://media.licdn.com/dms/image/C5603AQG94pk2yirIIg/profile-displayphoto-shrink_800_800/0/1615479527855?e=2147483647&v=beta&t=OuxDpxVu57gQzJdO-T-GeGCrHMyUgIaHkOMR3mgfyCY'
);

const myStore = useMyStore();
const { message } = storeToRefs(myStore);
const file = ref(null);
</script>

<template>
  <q-file rounded standout v-model="file" label="Rounded filled">
    <template v-slot:prepend> <q-icon name="attach_file" /> </template
  ></q-file>
</template>
<style lang="sass">
.text-brand
  color: $green !important
.bg-brand
  background: linear-gradient(160deg, $light-green 0%, $green 40%) !important
</style>
