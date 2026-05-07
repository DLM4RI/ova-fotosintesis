<template>
  <div :style="appStyles">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppSettings } from '@/composables/useAppSettings'

const { state } = useAppSettings()

const appStyles = computed(() => ({
  fontSize: `${state.fontSize}%`,
  '--primary-color': state.themeColor,
  transition: 'all 0.3s ease'
}))
</script>

<style>
/* Global primary color binding */
:root {
  --primary-color: #80a124;
}

body {
  font-family: 'Inter', sans-serif;
  color: #1a1a1a;
  background: #fbfbfd;
}

/* Vuetify overrides to use our dynamic primary color if needed */
.v-btn--variant-flat {
  /* This is just an example of how we could bind it */
}
</style>

