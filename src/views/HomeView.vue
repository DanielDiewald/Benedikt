<script setup>
import Welcome from '../components/Welcome.vue';
</script>

<template>
  <Welcome class="q-ml-xl q-mr-xl gt-sm"></Welcome>

  <Welcome class="lt-md"></Welcome>
</template>
<style lang="sass">
.text-brand
  color: $green !important
.bg-brand
  background: linear-gradient(160deg, $light-green 0%, $green 40%) !important
body.body--dark
  background: #111827
body.body--light
  color: $grey-10
.q-card--dark
  background: #161f32 !important
.q-card
  border-radius: 2rem
  background: $grey-2
.ben-brand
  background: linear-gradient(160deg, $light-green 0%, $green 40%)
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
</style>
