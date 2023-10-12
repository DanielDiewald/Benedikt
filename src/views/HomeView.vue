<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useChatStore } from '../stores/chat.js';

const profile = ref(
  'https://media.licdn.com/dms/image/C5603AQG94pk2yirIIg/profile-displayphoto-shrink_800_800/0/1615479527855?e=2147483647&v=beta&t=OuxDpxVu57gQzJdO-T-GeGCrHMyUgIaHkOMR3mgfyCY'
);

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
    console.log(chatStore.messages)
  }
}

</script>

<template>
  <q-file 
  rounded 
  standout 
  v-model="file"
  accept=".txt"
  @update:model-value="handleUpload()"
  label="Rounded filled">
    <template v-slot:prepend> <q-icon name="attach_file" /> 
    </template>
  </q-file>
</template>
<style lang="sass">
.text-brand
  color: $green !important
.bg-brand
  background: linear-gradient(160deg, $light-green 0%, $green 40%) !important
</style>
