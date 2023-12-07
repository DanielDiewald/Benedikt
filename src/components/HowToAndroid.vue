<template>
  <q-intersection once transition="scale" class="example-item">
    <div class="col-12 q-pa-md">
      <p class="text-h4 text-brand text-bold gt-sm">
        <span class="ben-brand">How to use Benedikt on Android?</span>
      </p>
      <p class="text-h6 text-brand q-mr-md text-bold lt-md">
        <span class="ben-brand">How to use Benedikt on Android?</span>
      </p>
      <div class="row items-start">
        <div class="col-12 col-sm-12 col-md-4 q-pa-sm">
          <q-card class="my-card" flat>
            <q-card-section>
              <div class="text-h6">📱 Export WhatsApp Chats</div>
              <div class="text-subtitle2">
                Open WhatsApp and select the chat you want to export. Open Chat
                Options: Inside the chat, tap the three-dot menu icon. Tap on
                More. Selecet "Export Chat." Choose not to include media. Select
                the destination for the exported chat (email, cloud storage,
                etc.).
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-12 col-md-4 q-pa-sm">
          <q-card class="my-card" flat>
            <q-card-section>
              <div class="text-h6">📁 Receive the Chat File</div>
              <div class="text-subtitle2">
                Check your chosen destination (email, cloud storage, etc.) to
                find the chat file. It may be in a compressed format like a ZIP
                file. Download the ZIP file to your device if necessary. Use a
                file manager app or a dedicated ZIP extractor app to uncompress
                the ZIP file. Once uncompressed, you should have access to the
                chat text file.
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-12 col-md-4 q-pa-sm">
          <q-card class="my-card" flat>
            <q-card-section>
              <div class="text-h6">🏁 Import the Chat Text File</div>
              <div class="text-subtitle2">
                Open the Benedikt app or website on your device. Look for an
                option to import or open a text file. Select the exported
                WhatsApp chat text file you want to import. Once imported, you
                can review your chat statistics, insights, or any other features
                offered by the Benedikt app to analyze the chat data.
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-intersection>
</template>
<style scoped>
.my-card {
  background: none !important;
}
</style>
