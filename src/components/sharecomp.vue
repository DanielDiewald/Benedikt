<template>
  <q-card>
    <q-card-section class="row items-center">
      <q-avatar color="brand" text-color="white"
        ><img src="/logo.png"
      /></q-avatar>
      <span class="q-ml-sm text-uppercase">privacy information</span>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <p>
        Share your usage insights securely with our tracking system. Your
        privacy is our priority—only your stats are saved, and private messages
        remain confidential. Stats are deleted after one week for added
        security.
      </p>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn rounded flat label="Cancel" v-close-popup />
      <q-btn rounded unelevated label="Agree" color="brand" v-close-popup />
    </q-card-actions>
  </q-card>
</template>
<stlye scoped lang="sass">
.q-card
  background: rgba( 255, 255, 255, 0.70 ) !important
  box-shadow: none !important
  backdrop-filter: blur( 4px )
  -webkit-backdrop-filter: blur( 4px )
  border-radius: 16px !important
.q-card--dark
  background: #11182795 !important
  box-shadow: none !important
  backdrop-filter: blur( 4px )
  -webkit-backdrop-filter: blur( 4px )
  border-radius: 16px !important
</stlye>
