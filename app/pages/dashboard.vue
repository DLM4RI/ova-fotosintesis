<template>
  <v-card>
    <v-img
      :src="useAsset('logo.png')"
      width="300"
      height="300"
      class="mx-auto mb-6"
    />

    <h3 class="font-weight-black text-center">Powered @DLM4RI Technology</h3>
  </v-card>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
});
</script>
