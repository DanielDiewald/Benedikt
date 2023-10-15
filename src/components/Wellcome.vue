<script setup>
import { ref } from 'vue';
const cards = ref([{title: '📈 Detailed Stats', description: 'Get comprehensive insights into your WhatsApp usage, from the number of messages sent and received to files shared.'}, {title: '📅 Historical Data', description: 'Keep a record of your stats over time, allowing you to visualize trends and patterns in your messaging habits.'},{title: '🔒 Privacy First', description: "Your data is secure and private. Benedikt doesn't access your messages or content, ensuring your WhatsApp conversations remain confidential."},{title: '🌟 User-Friendly', description: "With an intuitive interface, Benedikt is incredibly easy to use. Whether you're a tech enthusiast or a casual user, you'll find tracking your stats a breeze."},{title: '📱 Mobile and Web', description: 'Access Benedikt on both your mobile device and web browser, providing flexibility and accessibility wherever you are.'},{title: '👥 Share and Compare', description: 'Share your achievements and stats with friends, and compare your WhatsApp activity to see how you stack up.'}, ])
</script>
<template>
  <div class="row">
    <div class="col-12 q-pa-md">
      <div class="Benedikt-title q-pr-md q-pl-md">
        <p class="text-brand text-h4 lt-lg q-mb-none text-bold "><span class="ben-brand">Benedikt</span> 🦉</p>
        <p class="text-h4 q-mb-none lt-lg text-bold gt-sm">
          Your Personal WhatsApp Assistant for Tracking Stats!
        </p>
        <p class="text-brand gt-md text-h2 q-mb-none text-bold "><span class="ben-brand">Benedikt</span> 🦉</p>
        <p class="text-h3 gt-md q-mb-none text-bold gt-sm">
          Your Personal WhatsApp Assistant for Tracking Stats!
        </p>
        <p class="text-h6 q-mb-none text-bold lt-md">
          Your Personal WhatsApp Assistant for Tracking Stats!
        </p>
        <p class="text-caption lt-lg text-left">
          Detailed Stats, Historical Data, Privacy First, User-Friendly, Mobile
          and Web, Share and Compare
        </p>
        <p class="text-body2 gt-md text-left">
          Detailed Stats, Historical Data, Privacy First, User-Friendly, Mobile
          and Web, Share and Compare
        </p>
        <div class="lt-sm">
        <q-btn size="sm" rounded color="brand" unelevated class="q-mr-sm" to="/app">Start now</q-btn>
        <q-btn size="sm" flat rounded icon="play_circle">&#160 Watch Video Tutorial</q-btn></div>
        <div class="gt-xs">
        <q-btn size="md" rounded color="brand" unelevated class="q-mr-sm" to="/app">Start now</q-btn>
        <q-btn size="md" flat rounded icon="play_circle">&#160 Watch Video Tutorial</q-btn></div>
      </div>
      
    </div>
   
    <div class="col-12 q-pa-md">
      <p class="text-h4 text-brand q-ml-md text-bold gt-sm">
      <span class="ben-brand">Why choose Benedikt?</span>
      </p>
      <p class="text-h6 text-brand q-ml-md q-mr-md text-bold lt-md">
        <span class="ben-brand">Why choose Benedikt?</span>
      </p>
      <div class="row items-start">
      <q-intersection
        v-for="c in cards" v-bind:key="c.title"
        transition="scale"
        class="example-item"
      ><div class="col-12 col-sm-6 col-md-4 q-pa-sm xs" >
          <q-card class="my-card" flat >
            <q-card-section>
              <div class="text-h6">{{c.title}}</div>
              <div class="text-subtitle2 text-weight-light">
                {{c.description}}
              </div>
            </q-card-section>
          </q-card>
        </div></q-intersection>
        
         <div class="col-12 col-sm-6 col-md-4 q-pa-sm md" v-for="c in cards" v-bind:key="c.title">
          <q-card class="my-card" flat style="min-height: 175px">
            <q-card-section>
              <div class="text-h6">{{c.title}}</div>
              <div class="text-subtitle2 text-weight-light">
                {{c.description}}
              </div>
            </q-card-section>
          </q-card>
        </div>
         <div class="col-12 col-sm-6 col-md-4 q-pa-sm lg" v-for="c in cards" v-bind:key="c.title">
          <q-card class="my-card" flat style="min-height: 150px">
            <q-card-section>
              <div class="text-h6">{{c.title}}</div>
              <div class="text-subtitle2 text-weight-light">
                {{c.description}}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-6 col-md-4 q-pa-sm xl" v-for="c in cards" v-bind:key="c.title">
          <q-card class="my-card q-pa-md" flat >
            <q-card-section>
              <div class="text-h6">{{c.title}}</div>
              <div class="text-subtitle2 text-weight-light">
                {{c.description}}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-6 col-md-4 q-pa-sm sm" v-for="c in cards" v-bind:key="c.title">
          <q-card class="my-card" flat style="min-height: 170px">
            <q-card-section>
              <div class="text-h6">{{c.title}}</div>
              <div class="text-subtitle2 text-weight-light">
                {{c.description}}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="col-12 q-pl-lg q-pr-lg">
    
    <p class="text-bold q-mb-none q-mt-sm">Impressum</p>
    <p class="text-caption " >Daniel Diewald | E-Mail: diewald.d02@htlwienwest.at</p>
    </div>
  </div>
</template>
<style scoped lang="sass">
.Benedikt-title 
  max-width: 600px

</style>
