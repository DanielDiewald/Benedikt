<template>
  <div class="benediktapp">
    <div class="q-ma-md">
      <p class="text-h4 text-brand text-bold q-mb-none">Shared Stats</p>
      <p class="q-mt-none">
        <span>#3 <q-tooltip>Chat #ID</q-tooltip></span>
      </p>

      <q-separator />
      <div class="row items-start">
        <div class="col-4 col-lg-2">
          <q-item>
            <q-item-section avatar>
              <q-icon color="brand" class="ben-brand" name="message" />
            </q-item-section>
            <q-item-section>
              <q-item-label>0</q-item-label>
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
              <q-item-label> 0 </q-item-label>
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
              <q-item-label> 0</q-item-label>
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
              <q-item-label> 0 </q-item-label>
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
              <q-item-label> 0 </q-item-label>
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
              <q-item-label>0</q-item-label>
              <q-item-label caption lines="2" class="gt-xs"
                >voicemails</q-item-label
              ></q-item-section
            >
          </q-item>
        </div>
      </div>

      <q-separator />
    </div>
  </div>
</template>
